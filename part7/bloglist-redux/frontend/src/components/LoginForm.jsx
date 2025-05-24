import { useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";
import { initializeBlogs } from "../reducers/blogReducer";
import Notification from "./Notification";
import {
  Box,
  Typography,
  Input,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    e.target.username.value = "";
    e.target.password.value = "";

    dispatch(login(username, password));
    dispatch(initializeBlogs());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2" paddingBottom={4}>
        Hi there, Welcome!
      </Typography>
      <Typography variant="h5" paddingBottom={2}>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <InputLabel>Username</InputLabel>
          <Input
            name="username"
            type="text"
            id="username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
          />
          <InputLabel>Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="outlined" type="submit" id="login-button">
            login
          </Button>
        </Box>
      </form>
      <Notification />
    </Box>
  );
};

export default LoginForm;
