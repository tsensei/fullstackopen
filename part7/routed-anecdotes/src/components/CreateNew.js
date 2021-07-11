import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/index";

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField("content", "text");
  const author = useField("author", "text");
  const info = useField("info", "text");
  const history = useHistory();

  const resetAll = () => {
    content.onChange("");
    author.onChange("");
    info.onChange("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`a new anecdote ${content.value} created`);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={resetAll}>reset</button>
    </div>
  );
};

export default CreateNew;
