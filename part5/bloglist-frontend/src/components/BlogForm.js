import React, { useRef } from "react";
import blogsService from "../services/blogs";

const BlogForm = ({ setBlogs, setNotification }) => {
  const titleRef = useRef();
  const authorRef = useRef();
  const urlRef = useRef();
  const createBlog = async (e) => {
    e.preventDefault();
    const newBlog = await blogsService.create({
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    });
    titleRef.current.value = "";
    authorRef.current.value = "";
    urlRef.current.value = "";

    setBlogs((prevBlogs) => prevBlogs.concat(newBlog));
    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <>
      <h2>Create New</h2>
      <form id="form" onSubmit={createBlog}>
        <div>
          title:
          <input id="title-input" type="text" name="title" ref={titleRef} />
        </div>
        <div>
          author:
          <input id="author-input" type="text" name="author" ref={authorRef} />
        </div>
        <div>
          url:
          <input id="url-input" type="text" name="url" ref={urlRef} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
