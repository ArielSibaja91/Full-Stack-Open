const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog.routes');
const userRouter = require('./controllers/user.routes');

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

module.exports = app;