const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog.routes');
const userRouter = require('./controllers/user.routes');
const loginRouter = require('./controllers/login.routes');
const middleware = require('./middlewares/middleware');

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.errorHandler);

module.exports = app;