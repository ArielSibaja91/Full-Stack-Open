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
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from '@mui/icons-material/EditNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const Home = () => {
    return (
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h4" paddingBottom={2}>Welcome to the Blog App</Typography>
        <AddBlog />
        <BlogList />
      </Box>
    )
  }

  const Blogs = () => {
    return (
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h4" paddingBottom={2}>Blogs</Typography>
        <BlogList />
      </Box>
    )
  }

  if(authUser === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon sx={{ mr: 0.5 }}  />
            Home
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            <EditNoteIcon sx={{ mr: 0.5 }}  />
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            <PeopleAltIcon sx={{ mr: 0.5 }} />
            Users
          </Button>
          <Button color="inherit" type="submit" onClick={handleLogout}>
            Logout
            <LogoutIcon sx={{ ml: 0.5 }} />
          </Button>
          <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'end' }}>
            {authUser.username} logged in!
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>
      
      <Notification />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={authUser ? <Home /> : <LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </Container>
  );
};

export default App;
