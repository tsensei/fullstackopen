import React, { useRef, useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";
import Notification from "./Notification";

const Login = ({ setUser }) => {
  const [notification, setNotification] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      setUser(user);
      blogsService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (e) {
      console.log(e);
      setNotification("Wrong username or password");
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h2>Login in to application</h2>
      {notification && <Notification message={notification} error={true} />}
      <div>
        Username: <input type="text" name="Username" ref={usernameRef} />
      </div>
      <div>
        Password: <input type="password" name="Password" ref={passwordRef} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
