const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const testHelper = require('../utils/test_helper');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

describe('Initial blogs in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('root', 10);
        const user = new User({
            username: 'root',
            name: 'root',
            passwordHash
        });
        await user.save();

        const users = await testHelper.usersInDb();
        const root = users.find(user => user.username === 'root');

        await Blog.deleteMany({});

        for (let blog of testHelper.blogs) {
            let blogObject = new Blog(blog);
            blogObject.user = root.id;
            await blogObject.save();
        };
    });

    describe('Get the blog list', () => {
        test('in JSON format', async () => {
            await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
        });
        test('verify if the blog list length is correct', async () => {
            const response = await api.get('/api/blogs');
            assert.strictEqual(response.body.length, testHelper.blogs.length)
        });
        test('verify if the unique identifier is named id', async () => {
            const response = await api.get('/api/blogs');
            const result = response.body[0];
            const keys = Object.keys(result);
            assert(keys.includes('id'));
            assert.strictEqual(keys.includes('_id'), false);
        });
    });

    describe('Adding new posts', () => {
        test('Adding a blog post without a token returns 401 code', async () => {
            const newBlog = {
                title: 'new blog post',
                author: 'example',
                url: 'http://newblog.com',
                likes: 2
            };
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/);
        });
    });
    test('add a new blog post', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'root', password: 'root' })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const token = loginResponse.body.token;

        const newBlog = {
            title: 'new blog post',
            author: loginResponse.body.name,
            url: 'http://example.com',
            likes: 2
        };
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        // simplified version of the previous tests implemented
        const newResponse = await api.get('/api/blogs');
        const titles = newResponse.body.map(response => response.title);
        assert.strictEqual(titles.length, testHelper.blogs.length + 1);
        assert(titles.includes(newBlog.title));
    });

    describe('Blog post properties', () => {
        test('blog post without likes defaults to 0', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({ username: 'root', password: 'root' })
                .expect(200)
                .expect('Content-Type', /application\/json/);
            const token = loginResponse.body.token;

            const newPost = {
                title: 'Blog with 0 likes',
                author: 'Ariel',
                url: 'http://example.com',
            };
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newPost)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const response = await api.get('/api/blogs');
            const newBlog = response.body.find(blog => blog.title === newPost.title);

            assert.strictEqual(newBlog.likes, 0);
        });
        test('verifies if missing title property returns 400', async () => {
            const BlogWithoutTitle = {
                author: 'Ariel',
                url: 'http://example.com',
            }
            await api
                .post('/api/blogs')
                .send(BlogWithoutTitle)
                .expect(400)
        });
        test('verifies missing url property returns 400', async () => {
            const BlogWithoutTitle = {
                title: 'Hello World',
                author: 'Ariel',
            };
            await api
                .post('/api/blogs')
                .send(BlogWithoutTitle)
                .expect(400);
        });
    });

    describe('Deleting and updating blog posts', () => {
        test('delete a blog post', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({ username: 'root', password: 'root' })
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const token = loginResponse.body.token;

            const initialResponse = await api.get('/api/blogs');
            const initialBlogs = initialResponse.body;
            const blogToDelete = initialBlogs[0];

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204);

            const updatedResponse = await api.get('/api/blogs');
            const updatedBlogs = updatedResponse.body;
            const ids = updatedBlogs.map(blog => blog.id);
            assert.strictEqual(updatedBlogs.length, initialBlogs.length - 1);
            assert.strictEqual(ids.includes(blogToDelete.id), false);
        });
        test('update a blog post', async () => {
            const loginResponse = await api
                .post('/api/login')
                .send({ username: 'root', password: 'root' })
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const token = loginResponse.body.token;

            const initialResponse = await api.get('/api/blogs');
            const initialBlogs = initialResponse.body;
            const blogToUpdate = initialBlogs[0];
            const updatedBlog = {
                ...blogToUpdate,
                user: blogToUpdate.user.id,
                likes: blogToUpdate.likes + 1,
            };
            const updatedResponse = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/);
            const returnedBlog = updatedResponse.body;
            assert.strictEqual(returnedBlog.likes, updatedBlog.likes);
        });
    });
});

after(async () => {
    await mongoose.connection.close()
});