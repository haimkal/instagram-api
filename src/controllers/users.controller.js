const md5 = require ('md5');
const User = require ('../models/user');
const Post = require ('../models/post'); 
const jwt = require ('jsonwebtoken');
const {jwtSecret} = require('../config/environment/index');
const { urlencoded } = require('body-parser');

class UsersContoroller {

    static create (req, res) {
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        user.save()
            .then ((newUser)=> {
                res.status(201).send(newUser)
            })
            .catch((err)=> {
                console.log(err);
                res.status(400).send(err);
            });
    }

    static login (req,res) {
        console.log(req.body);
        User.findOne ({
            username: req.body.username,
            password: md5(req.body.password)
        }).then(user => {
            if(!user) {
                res.sendStatus(401);
                return;
            }
            
        
            const payload = {
                _id: user._id,
                username: user.username
            };
            const token = jwt.sign(payload, jwtSecret);

            res.send({token});
        }).catch(()=> res.sendStatus(500));
    }

    
    
    static me(req, res){
            res.send(req.user);
        }
    

    static check(req, res) {
        const {username, email} = req.query;
        let property = email ? 'email' : 'username';
        
        
        try{
            User.exists({
                [property]: req.query[property]
            })
               .then(isExist=> {
                   res.json(isExist);
               });
        }
        catch(err){
                console.log(err);
                res.status(400).json(err);
            } 
        }

    static async getPosts (req, res)  {
           const {username}= req.params;
            try{
                const userPostsOwner= await User.findOne({username});
                if (!userPostsOwner){
                    res.sendStatus(404);
                    return;
                }
                const posts = await Post
                .find({user: userPostsOwner._id})
                .populate('user', ['username','avatar']);
                res.json(posts);
                }
            catch(err){
                    console.log(err);
                    res.sendStatus(500);
                } 
            }
            
            static async get (req, res) {
                const {username}= req.params;
                try {
                    const user= await User.findOne({username});
                    if (!user){
                        res.sendStatus(404);
                        return;
                    }
                    const {_id,  avatar} = user;
                    res.json({_id, username, avatar });
                }
                catch(err) {
                    console.log(err);
                    res.sendStatus(500);
                    }
                        
            }
            static async getAll (req, res) {
                const {username} = req.query;
                try {
                    const users = await User.find({
                        username: new RegExp(username, 'i')
                    });
                    
                    res.json(users.map(user=> ({
                            _id: user._id,
                            username: user.username,
                            avatar: user.avatar,
                            bio: user.bio,
                            createAt: user.createAt
                        })));
                }catch (err) {
                    console.log(err);
                    res.sendStatus(500);
                }

            }

            static async editUser(req, res){
          
            try{
                const{id} = req.params;
                const userToEdit = await User.findByIdAndUpdate(id, req.body, {new: true});
                res.status(200).send(userToEdit);
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
        }
         

            
    };


    
        


    



module.exports = UsersContoroller;
