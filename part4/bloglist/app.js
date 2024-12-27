const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());

app.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

app.post('/api/blogs', async (request, response) => {
    const { title, url } = request.body;

    if(!title || !url) {
        return response.status(400).end();
    };
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
});

app.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

app.put('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(201).json(request.body)
});

module.exports = app;