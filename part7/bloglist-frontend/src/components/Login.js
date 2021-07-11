import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import Notification from "./Notification";

const Login = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(loginUser(user));
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <form className="loginForm" onSubmit={handleLogin}>
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
