const commentsRouter = require('express').Router();
const CommentModel = require('../models/comment');
const Blog = require('../models/blog');

commentsRouter.get('/:id/comments', async (request, response) => {
    const comments = await CommentModel.find({ blogs: request.params.id })
    response.json(comments);
});

commentsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body;
    const blog = await Blog.findById(request.params.id);

    const comment = new CommentModel({
        content: body.content,
        blogs: blog._id,
    });

    if (!body.content) {
        response.status(400).json({ error: 'content missing' });
    } else {
        const savedComment = await comment.save();
        response.status(201).json(savedComment);
    }
});

module.exports = commentsRouter;