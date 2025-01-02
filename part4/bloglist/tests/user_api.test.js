const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const testHelper = require('../utils/test_helper');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const bcrypt = require('bcryptjs');

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            username: 'root',
            name: 'root',
            passwordHash
        });

        await user.save();
    });
});

describe('Adding new users', () => {
    test('Creation succedes with a fresh username', async () => {
        const usersAtStart = await testHelper.usersInDb();

        const newUser = {
            username: 'ariel',
            name: 'Ariel Sibaja',
            password: 'password',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await testHelper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        assert(usernames.includes(newUser.username));
    });
});

after(async () => {
    await mongoose.connection.close()
});