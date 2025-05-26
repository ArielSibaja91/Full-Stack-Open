import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVotes, deleteBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useNavigate } from "react-router-dom";
import { initializeComments } from "../reducers/commentReducer";
import BlogComment from "./BlogComment";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Link
} from "@mui/material";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const authUser = useSelector((state) => state.authUser);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === String(id));

  useEffect(() => {
    if (id) {
      dispatch(initializeComments(id));
    }
  }, [dispatch, id]);

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
      navigate("/blogs");
      dispatch(setNotification(`you removed ${blog.title}`, "success", 5));
    }
  };

  const showButton = blog.user?.id === authUser?.id ? true : false;

  return (
    <Box>
      <Card variant="outlined" sx={{ maxWidth: 500, padding: 2, mb: 2 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">
            {blog.title} {blog.author}
          </Typography>
          <Link href={blog.url} underline="none" color="dodgerblue">{blog.url}</Link>
          <Typography variant="body2">
            {blog.likes} <Button onClick={addLike} variant="outlined" sx={{ ml: 0.5 }}>likes</Button>
          </Typography>
          <Typography >Added by {blog.user !== null && blog.user.name}</Typography>
        </CardContent>
        <CardActions>
          {showButton && (
            <Button
              onClick={deleteBlog}
              id="remove-button"
              variant="outlined"
              color="error"
            >
              remove
            </Button>
          )}
        </CardActions>
      </Card>
      <BlogComment id={blog.id} />
    </Box>
  );
};

export default SingleBlog;
