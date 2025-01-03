const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
    const { title, url } = request.body;

    if(!title || !url) {
        return response.status(400).end();
    };
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(201).json(request.body)
});

module.exports = blogRouter;