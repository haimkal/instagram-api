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

routes.get('/post', auth, PostsContoller.feed);
routes.put('/post', upload.single('image'),  PostsContoller.create);
module.exports = routes;