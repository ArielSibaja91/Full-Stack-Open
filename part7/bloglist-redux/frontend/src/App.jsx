import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggable from "./components/Toggable";
import AddBlog from "./components/AddBlog";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // Added an update state to manage the re-rendering of the blog list when a blog is liked
  const [update, setUpdate] = useState(false);
  // Added toggable reference to manage the visibility of the new blog form
  const toggableRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [update]);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Welcome ${user.username}`, "success", 5));
    } catch (error) {
      dispatch(setNotification("Wrong username or password", "error", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addNewBlog = (newBlog) => {
    blogService.createBlog(newBlog).then((createdBlog) => {
      setBlogs(blogs.concat(createdBlog));
      dispatch(setNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        "success",
        5,
      ));
      toggableRef.current.toggleVisibility();
    });
  };

  const handleLikes = async (id, updatedBlog) => {
    await blogService.updateBlog(id, updatedBlog);
    setUpdate(!update);
  };

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id);
    setUpdate(!update);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log into the application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Toggable buttonLabel="create new blog" ref={toggableRef}>
        <AddBlog newBlog={addNewBlog} />
      </Toggable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={handleLikes}
          removeBlog={handleDelete}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
