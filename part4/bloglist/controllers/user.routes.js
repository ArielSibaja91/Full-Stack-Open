const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = userRouter;

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate(
        'blogs',
        { title: 1, url: 1, likes: 1 }
    );
    response.json(users);
});

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (password.length < 3) {
        response.statusCode = 400
        response.json({ error: 'The password length must be at lest 3 characters long' });
    };

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const newUser = await user.save();

    response.status(201).json(newUser);
});