const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const total = blogs.reduce((accumulator, current) => accumulator + current.likes, 0)
    return blogs.length === 0 ? 0 : total;
};

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((max, current) => current.likes >= max.likes ? current : max);
    delete maxLikes._id;
    delete maxLikes.__v;
    delete maxLikes.url;
    return maxLikes;
};

const mostBlogs = (blogs) => {
    const authors = _.map(
        _.groupBy(blogs, 'author'),
        (elements => ({
            author: elements[0].author,
            blogs: elements.length
        }))
    );
    const mostAuthorBlogs = _.maxBy(
        authors,
        (element => {
            return element.blogs;
        })
    );
    return mostAuthorBlogs;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};