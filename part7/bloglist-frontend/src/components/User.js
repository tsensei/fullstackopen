import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => {
    return state.users.find((user) => user.id == id);
  });
  console.log(currentUser);
  if (!currentUser) return null;
  return (
    <div className="blogSingle">
      <h1>{currentUser.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {currentUser.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
