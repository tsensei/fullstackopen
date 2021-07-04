import React, { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import blogsService from "../services/blogs";

const Blogs = ({ blogs, setBlogs, user, setUser, setNeedUpdate }) => {
  const [notification, setNotification] = useState(null);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedBlogappUser");
    blogsService.setToken(null);
  };
  return (
    <>
      <h2>blogs</h2>
      {notification && <Notification message={notification} error={false} />}
      <h3>{user.username} logged in</h3>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="Create new blog">
        <BlogForm setNotification={setNotification} setBlogs={setBlogs} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          showDelete={blog.user.username === user.username ? true : false}
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setNeedUpdate={setNeedUpdate}
        />
      ))}
    </>
  );
};

export default Blogs;
