const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate(
        'blogs',
        { title: 1, url: 1, likes: 1, author: 1, id: 1 }
    );
    response.json(users);
});

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (password.length < 3) {
        response.statusCode = 400;
        return response.json({ error: 'The password length must be at least 3 characters long' });
    };

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const newUser = await user.save();
    
    const userForToken = {
        username: newUser.username,
        id: newUser._id,
    };

    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

    response.status(201).send({ token, username: newUser.username, name: newUser.name, id: newUser._id });
});

module.exports = userRouter;