import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggable from "./components/Toggable";
import AddBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [classType, setClassType] = useState("");
  // Added toggable reference to manage the visibility of the new blog form
  const toggableRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setMessage(`Welcome ${user.username}`);
      setClassType("success");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("Wrong username or password");
      setClassType("error");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addNewBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user.name,
    };

    blogService
      .createBlog(newBlog)
      .then((createdBlog) => {
        setBlogs(blogs.concat(createdBlog))
        setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
        setClassType("success")
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        toggableRef.current.toggleVisibility();
        setTitle("");
        setAuthor("");
        setUrl("");
      });
  };

  if (user === null) {
    return (
      <div>
        <h2>Log into the application</h2>
        <Notification message={message} classType={classType} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} classType={classType} />
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Toggable buttonLabel="new blog" ref={toggableRef}>
        <AddBlog
          handleSubmit={addNewBlog}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Toggable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
