import { useState } from "react";

const Blog = ({ blog, addLikes, removeBlog, user }) => {
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

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  const showButton = blog.user?.id === user?.id ? true : false;
  console.log("showButton", showButton);
  console.log("blog id:", blog.user?.id, "user id:", user?.id);

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="hidden">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="visible">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user && blog.user.username}</p>
        {showButton && (
          <button onClick={deleteBlog} id="remove-button">
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
