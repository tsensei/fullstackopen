import React from "react";

import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
