import React from "react";

import Part from "./Part";
import Sum from "./Sum";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} content={part} />
      ))}
      <Sum content={parts} />
    </>
  );
};

export default Content;
