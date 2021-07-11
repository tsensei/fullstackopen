import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import {
  increaseLikeOf,
  deleteBlogOf,
  postCommentOn,
} from "../reducers/blogReducer";
const Blog = () => {
  const commentRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id == id);
  });

  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const increaseLike = () => {
    dispatch(increaseLikeOf(blog));
  };

  const postComment = (e) => {
    e.preventDefault();
    dispatch(postCommentOn(blog.id, commentRef.current.value));
    commentRef.current.value = "";
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(deleteBlogOf(blog.id));
    }
    history.push("/");
  };
  return (
    <div className="blogSingle">
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={increaseLike}>like</button>
      </p>
      <p>added by {blog.author}</p>
      {username == blog.user.username && (
        <button onClick={deleteBlog}>Delete</button>
      )}
      <h4>comments</h4>
      <form onSubmit={postComment}>
        <input ref={commentRef} type="text" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
