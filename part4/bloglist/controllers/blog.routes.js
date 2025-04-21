const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate(
        'user',
        { username: 1, name: 1, id: 1 }
    );
    response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url) {
        return response.status(400).end();
    };

    if (!request.user) {
        return response.status(401).json({ error: 'Unauthorized: token missing or invalid' });
    };

    const user = request.user;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    });

    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    response.status(201).json(newBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'Invalid Token' });
    };

    const user = request.user;
    const selectedBlog = await Blog.findById(request.params.id);

    if (selectedBlog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } else {
        response.status(401).json({ error: 'This user cannot delete this blog' });
    };
});

blogRouter.put('/:id', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'Invalid Token' });
    };
    const user = request.user;
    const selectedBlog = await Blog.findById(request.params.id);

    if (selectedBlog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(201).json(request.body);
    } else {
        response.status(401).json({ error: 'This user cannot modify this blog' });
    };
});

module.exports = blogRouter;