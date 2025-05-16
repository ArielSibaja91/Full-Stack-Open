import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, initializeUser } from "./reducers/authReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  // Added toggable reference to manage the visibility of the new blog form
  const toggableRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

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
      <Toggable buttonLabel="create new blog" ref={toggableRef}>
        <AddBlog />
      </Toggable>
      <BlogList />
      
      <Routes>
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  );
};

export default App;
