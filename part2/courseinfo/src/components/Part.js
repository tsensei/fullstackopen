import React from "react";

const Part = ({ content }) => {
  return (
    <p>
      {content.name} {content.exercises}
    </p>
  );
};

export default Part;
