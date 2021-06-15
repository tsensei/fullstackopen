import React from "react";

function Sum({ content }) {
  let count = content.reduce((total, item) => {
    return total + item.exercises;
  }, 0);
  return <b>Total of {count} exercises</b>;
}

export default Sum;
