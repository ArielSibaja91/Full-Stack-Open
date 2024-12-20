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

describe('favorite blog', () => {
    test('blog with most likes', () => {
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        };
        const result = listHelper.favoriteBlog(testHelper.blogs);
        assert.deepStrictEqual(result, expected);
    });
});

describe('most blogs', () => {
    test('of some author', () => {
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        };
        const result = listHelper.mostBlogs(testHelper.blogs);
        assert.deepStrictEqual(result, expected);
    });
});