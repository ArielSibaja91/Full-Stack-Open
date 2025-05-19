import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, initializeUser } from "./reducers/authReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const Home = () => {
    return (
      <div>
        <AddBlog />
        <BlogList />
      </div>
    )
  }

  const Blogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <BlogList />
      </div>
    )
  }

  if(authUser === null) {
    return (
      <LoginForm />
    )
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{authUser.username} logged in</p>
      <button type="submit" onClick={handleLogout}>logout</button>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={authUser ? <Home /> : <LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </div>
  );
};

export default App;
