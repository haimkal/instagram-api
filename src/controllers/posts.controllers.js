const fs = require('fs').promises;
const Post = require("../models/post");

class PostsContoller {

    static async feed (req,res){
        try {
            const posts = await Post
            .find()
            .populate('user',['username', 'avatar'])
            .sort({createdAt: req.query.sort || 1});

            res.json(posts);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
        // Post.find()
        //     .then(posts=> res.send(posts))
        //     .catch(err=> {
        //         res.sendStatus(500);
        //     });
    }


    static async create (req,res) {
        const fileName = req.file.filename;
        try {
            const imageBase64 = await fs.readFile('public/posts/' + fileName, {
                encoding: 'base64'
            });

        const post = new Post ({
            description: req.body.description,
            image: imageBase64,
            user: req.user._id
        });
            const newPost = await post.save();
            res.status(201).send(newPost);
        }catch (err){
            console.log(err);
            res.sendStatus(400);
        }
        
    }
    
    
    static async get (req,res){
        try {
            const post = await Post
            .findById(req.params.id)
            .populate('user', ['username','avatar'])
            if (!post) {
                res.sendStatus(404);
                return;
            }
                res.json(post);
            }catch(error)  {
            console.log(error);
            res.sendStatus(500);
            }
    }

    static async like (req, res) {
        try {
            const { id } = req.params;
            const post=  await Post.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id }}, {new: true});
            res.status(200).send(post);
            // console.log(id, post);
        } catch(err) {
            res.sendStatus(500);
        }


    }

    static async unlike (req, res){
        try{
            const {id} = req.params;
            const post= await Post.findByIdAndUpdate(id, { $pull: { likes: req.user._id }}, {new: true});
            res.status(200).send(post);
        } catch(err) {
            res.sendStatus(500);
        }

    }
}

module.exports = PostsContoller;