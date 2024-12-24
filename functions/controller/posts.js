const asyncHandler = require('express-async-handler');
const axios = require('axios');
const HOST = 'https://jsonplaceholder.typicode.com';
const API = axios.create({ baseURL: HOST, withCredentials: true });

//get all
exports.getPosts = asyncHandler(async (req, res) => {
    const posts = await API.get('/posts');
    if (!posts) res.status(404).json({ msg: 'No posts found' });
    res.status(200).json(posts.data);
});

//get 
exports.getPost = asyncHandler(async (req, res) => {
    const post = await API.get('/posts/' + req.params.id);
    if (!post) res.status(404).json({ msg: 'No posts found' });
    res.status(200).json(post.data);
});

//post
exports.createPost = asyncHandler(async (req, res) => {
    const post = await API.post('/posts/', req.body);
    res.status(201).json({ status: true, message: 'Post created successfully!', data: post.data });
});

//put
exports.updatePost = asyncHandler(async (req, res) => {
    const post = await API.put('/posts/' + req.params.id, req.body);
    res.status(201).json({ status: true, message: 'Post updated successfully!', data: post.data });
});

//delete
exports.deletePost = asyncHandler(async (req, res) => {
    const post = await API.delete('/posts/' + req.params.id);
    res.status(201).json({ status: true, message: 'Post deleted successfully!', data: post.data });
});