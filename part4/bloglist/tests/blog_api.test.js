const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const testHelper = require('../utils/test_helper');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

describe('Get the blog list', () => {
    test('in JSON format', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    });
    test('verify if the blog list length is correct', async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, testHelper.blogs.length)
    });
    test('unique identifier is named id', async() => {
        const response = await api.get('/api/blogs');
        const result = response.body[0];
        const keys = Object.keys(result); 
        assert(keys.includes('id'));
        assert.strictEqual(keys.includes('_id'), false);
    });
    test('add a new blog post', async () => {
        const initialResponse = await api.get('/api/blogs');
        const initialBlogs = initialResponse.body;
        const newPost = {
            title: 'New Blog Post',
            author: 'Alice',
            url: 'http://newblog.com',
            likes: 1,
        };
        const postResponse = await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const updatedResponse = await api.get('/api/blogs');
        const updatedBlogs = updatedResponse.body;
        assert.strictEqual(updatedBlogs.length, initialBlogs.length + 1);
        const createdBlog = updatedBlogs.find(blog => blog.id === postResponse.body.id);
        assert(createdBlog);
        assert.strictEqual(createdBlog.title, newPost.title);
        assert.strictEqual(createdBlog.author, newPost.author);
        assert.strictEqual(createdBlog.url, newPost.url);
        assert.strictEqual(createdBlog.likes, newPost.likes);
    });
});

after(async () => {
    await mongoose.connection.close()
});