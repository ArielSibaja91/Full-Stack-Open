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
});

after(async () => {
    await mongoose.connection.close()
});