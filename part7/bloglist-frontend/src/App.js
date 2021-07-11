import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedBlogappUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs(blogs));
  }, []);

  return <div className="app">{user === null ? <Login /> : <Blogs />}</div>;
};

export default App;
