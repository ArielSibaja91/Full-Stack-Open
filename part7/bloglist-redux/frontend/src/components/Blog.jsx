import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVotes, deleteBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);

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
    dispatch(addVotes(blog));
    dispatch(setNotification(`you liked ${blog.title}`, "success", 5));
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(blog.id));
      dispatch(setNotification(`you removed ${blog.title}`, "success", 5));
    }
  };

  const showButton = blog.user?.id === authUser?.id ? true : false;
  console.log("showButton", showButton);
  console.log("blog id:", blog.user?.id, "user id:", authUser?.id);

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
