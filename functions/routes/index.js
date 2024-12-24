const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controller/posts');
const { login } = require('../controller/auth');
const { GetBearer } = require('../middleware/bearer');

 
router.get('/', function(req, res){
    res.status(200).json({msg:'Serverless API is running!'});
})
router.route('/posts').get(getPosts).post(createPost);
router.route('/posts/:id').get(getPost).put(updatePost).delete(deletePost);

router.route('/auth/login').post(GetBearer,login)

module.exports = router;


 