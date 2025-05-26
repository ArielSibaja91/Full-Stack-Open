import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/authReducer";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Link as NavLink,
} from "@mui/material";
import Notification from "./Notification";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    e.target.username.value = "";
    e.target.name.value = "";
    e.target.password.value = "";

    dispatch(registerUser(username, name, password));
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
        Register into the application
      </Typography>
      <form onSubmit={handleRegister}>
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
            required
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
          />
          <InputLabel>Name</InputLabel>
          <Input
            name="name"
            type="text"
            id="name"
            required
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
            required
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
          />
          <Button variant="outlined" type="submit" id="register-button">
            register
          </Button>
          <Typography variant="body2" paddingTop={2}>
            If you have an account, please login{" "}
            <NavLink
              component={Link}
              to="/login"
              underline="none"
              color="dodgerblue"
            >
              here
            </NavLink>
          </Typography>
        </Box>
      </form>
      <Notification />
    </Box>
  );
};

export default RegisterForm;
