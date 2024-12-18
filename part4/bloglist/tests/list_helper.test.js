const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const testHelper = require('../utils/test_helper');

describe('dummy', () => {
    test('returns one', () => {
        const blogs = [];
        const result = listHelper.dummy(blogs);
        assert.strictEqual(result, 1);
    });
});

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.singleBlog);
        assert.strictEqual(result, 7);
    });
    
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testHelper.blogs);
        assert.strictEqual(result, 36);
    });
});