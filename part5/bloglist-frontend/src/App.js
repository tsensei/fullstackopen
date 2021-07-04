import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedBlogappUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs([...blogs].sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    if (blogs === undefined) return;
    if (needUpdate === false) return;
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes));
    setNeedUpdate(false);
  }, [needUpdate]);

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <Blogs
          setNeedUpdate={setNeedUpdate}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
