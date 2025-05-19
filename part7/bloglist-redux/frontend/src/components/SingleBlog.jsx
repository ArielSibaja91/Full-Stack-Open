import { useDispatch, useSelector } from "react-redux";
import { addVotes, deleteBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const authUser = useSelector((state) => state.authUser);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === String(id));

  if (!blog) {
    return null;
  }

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

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} <button onClick={addLike}>likes</button>
      </p>
      <p>added by {blog.user !== null && blog.user.name}</p>
      {showButton && (
        <button onClick={deleteBlog} id="remove-button">
          remove
        </button>
      )}
    </div>
  );
};

export default SingleBlog;
