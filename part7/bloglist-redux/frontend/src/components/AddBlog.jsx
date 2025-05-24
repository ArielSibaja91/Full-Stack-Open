import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Toggable from "./Toggable";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";

const AddBlog = () => {
  const dispatch = useDispatch();
  const toggableRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.title.value = "";
    e.target.author.value = "";
    e.target.url.value = "";

    const createdBlog = {
      title: title,
      author: author,
      url: url,
    };
    
    dispatch(createBlog(createdBlog));
    dispatch(
      setNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        "success",
        5
      )
    );
  }

  return (
    <Toggable buttonLabel="create a new blog" ref={toggableRef}>
      <Typography variant="h6">Create a new blog entry</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <div>
          <InputLabel>Title:</InputLabel>
          <Input
            type="text"
            name="Title"
            placeholder="write the title"
            id="title"
            required
          />
        </div>
        <div>
          <InputLabel>Author:</InputLabel>
          <Input
            type="text"
            name="Author"
            placeholder="write the author"
            id="author"
            required
          />
        </div>
        <div>
          <InputLabel>Url:</InputLabel>
          <Input
            type="url"
            name="url"
            placeholder="write the url"
            id="url"
            required
          />
        </div>
        </Box>
        <Button type="submit" id="create-button" variant="outlined" color="success" sx={{ mb: 1 }}>
          create
        </Button>
      </form>
    </Toggable>
  );
};

export default AddBlog;
