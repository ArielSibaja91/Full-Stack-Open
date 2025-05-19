import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Toggable from "./Toggable";

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
    <Toggable buttonLabel="create new blog" ref={toggableRef}>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            placeholder="write the title"
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            placeholder="write the author"
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="url"
            name="url"
            placeholder="write the url"
            id="url"
          />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </Toggable>
  );
};

export default AddBlog;
