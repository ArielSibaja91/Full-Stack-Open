import { useDispatch } from "react-redux";
import { login } from "../reducers/authReducer";
import { initializeBlogs } from "../reducers/blogReducer";
import Notification from "./Notification";

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
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name="username" type="text" id="username" />
        </div>
        <div>
          password
          <input name="password" type="password" id="password" />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  );
}

export default LoginForm;