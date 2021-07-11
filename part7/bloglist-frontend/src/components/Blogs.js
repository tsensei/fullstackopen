import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Blog from "./Blog";
import Users from "./Users";
import User from "./User";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Navbar />
      <div className="header">Blog App</div>
      {notification && <Notification message={notification} error={false} />}
      <Switch>
        <Route exact path="/">
          <Togglable buttonLabel="Create new blog">
            <BlogForm />
          </Togglable>
          <div className="blogs">
            {blogs.map((blog) => {
              return (
                <div className="blog" key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                    {"  "}
                    {blog.author}
                  </Link>
                </div>
              );
            })}
          </div>
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
      </Switch>
    </>
  );
};

export default Blogs;
