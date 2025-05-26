import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, initializeUser } from "./reducers/authReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UsersList from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Link as NavLink,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const Home = () => {
    return (
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h4" paddingBottom={2}>
          Welcome to the Blog App
        </Typography>
        {authUser && <AddBlog />}
        <BlogList />
      </Box>
    );
  };

  const Blogs = () => {
    return (
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h4" paddingBottom={2}>
          Blogs
        </Typography>
        <BlogList />
      </Box>
    );
  };

  if (authUser === null) {
    return (
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Container>
    );
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Blogs", icon: <EditNoteIcon />, path: "/blogs" },
    { text: "Users", icon: <PeopleAltIcon />, path: "/users" },
  ];

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                <HomeIcon sx={{ mr: 0.5 }} />
                Home
              </Button>
              <Button color="inherit" component={Link} to="/blogs">
                <EditNoteIcon sx={{ mr: 0.5 }} />
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
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              component={Link}
              to={`/users/${authUser.id}`}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "inherit",
                ml: 1,
                textTransform: "uppercase",
                fontSize: "15px",
              }}
            >
              {authUser.name}
              <AccountCircleIcon sx={{ ml: 1 }} />
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton component={Button} type="submit" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    textTransform: "lowercase",
                    textTransform: "capitalize",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={authUser ? <Home /> : <LoginForm />} />
        <Route
          path="register"
          element={authUser ? <Home /> : <RegisterForm />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </Container>
  );
};

export default App;
