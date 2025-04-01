import { useState } from "react";

const Blog = ({ blog, addLikes }) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visibility, setVisibility] = useState(false);
  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    addLikes(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          hide
        </button>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>
          {blog.user != null && blog.user.username}
        </p>
      </div>
    </div>
  );
};

export default Blog;
