import React, { useState } from "react";
import blogsService from "../services/blogs";
const Blog = ({ blog, blogs, setBlogs, setNeedUpdate, showDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const increaseLike = async () => {
    const retBlog = await blogsService.incLike(blog);
    setBlogs(
      blogs.map((item) => {
        if (item.id === retBlog.id) {
          item.likes++;
        }
        return item;
      })
    );
    setNeedUpdate(true);
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      await blogsService.deleteBlog(blog.id);
      setBlogs(blogs.filter((item) => item.id !== blog.id));
      setNeedUpdate(true);
    }
  };
  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="view-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide" : "view"}
        </button>
      </div>
      {expanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes <span className="like-num">{blog.likes}</span>
            <button className="likeBtn" onClick={increaseLike}>
              like
            </button>
          </p>
          <p>{blog.user.username}</p>
          {showDelete && (
            <button className="deleteBtn" onClick={deleteBlog}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
