import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import blogsService from "../services/blogs";

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("loggedBlogappUser");
    blogsService.setToken(null);
  };

  return (
    <div className="navbar">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>

      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default NavBar;
