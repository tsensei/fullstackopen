import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBlogs } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const authorRef = useRef();
  const urlRef = useRef();
  const createBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    };
    titleRef.current.value = "";
    authorRef.current.value = "";
    urlRef.current.value = "";

    dispatch(updateBlogs(newBlog));
    dispatch({
      type: "SET_NOTIFICATION",
      data: `a new blog ${newBlog.title} by ${newBlog.author} added`,
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: null,
      });
    }, 3000);
  };
  return (
    <div className="blogForm">
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
    </div>
  );
};

export default BlogForm;
