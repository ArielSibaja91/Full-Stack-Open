const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log('resetting db')

    response.status(204).end()
})

module.exports = testRouter