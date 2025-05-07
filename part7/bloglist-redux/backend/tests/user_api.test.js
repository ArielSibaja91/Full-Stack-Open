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
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'root',
      name: 'Super User',
      passwordHash
    });

    await user.save();
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

    test('Show an error if the username is not unique', async () => {
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'password'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({ "error": "expected username to be unique" });
    })

    test('Show an error when password length is less than 3 characters', async () => {
      const newUser = {
        name: 'New User',
        username: 'newuser',
        password: '12'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({ 'error': 'The password length must be at least 3 characters long' });
    });

    test('Show an error when username length is shorter than 3 characters', async () => {
      const newUser = {
        username: 'nu',
        name: 'New User2',
        password: 'password'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect({ "error": "User validation failed: username: Path `username` (`nu`) is shorter than the minimum allowed length (3)." })
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});