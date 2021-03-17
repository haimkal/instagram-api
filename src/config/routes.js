const express= require ('express');
const multer = require('multer');
const PostsContoller = require('../controllers/posts.controllers');
const UsersController=  require('../controllers/users.controller');
const auth = require ('../middlewares/auth');
const routes = express.Router();
const upload = multer({dest: 'public/posts'});



routes.put('/user', UsersController.create);
routes.post('/user/login', UsersController.login);
routes.post('/user/me', auth, UsersController.me);
routes.post('/user/check', UsersController.check);
routes.get('/user/:username/posts', auth, UsersController.getPosts);
routes.get('/user/:username', auth, UsersController.get);
routes.get('/user', auth, UsersController.getAll);
routes.post('/user/edit/:id',  UsersController.editUser);

routes.delete('/post/:id/unlike', auth, PostsContoller.unlike);
routes.post('/post/:id/like', auth, PostsContoller.like);
routes.get('/post', PostsContoller.feed);
routes.put('/post', auth, upload.single('image'),  PostsContoller.create);
routes.get('/post/:id', auth, PostsContoller.get);

routes.put('/post/:id/comment', auth, PostsContoller.createComment);
routes.get('/post/:id/comment', auth, PostsContoller.getComments);

routes.post('/user/:id/follow', auth, UsersController.follow);

routes.get('/', (req, res)=> res.send());
module.exports = routes;