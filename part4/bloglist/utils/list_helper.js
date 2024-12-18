const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const total = blogs.reduce((accumulator, current) => accumulator + current.likes, 0)
    return blogs.length === 0 ? 0 : total;
};

module.exports = {
    dummy,
    totalLikes
};