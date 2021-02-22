const md5 = require ('md5');
const User = require ('../models/user');
const jwt = require ('jsonwebtoken');
const {jwtSecret} = require('../config/environment/index');

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

    }
        


    



module.exports = UsersContoroller;
