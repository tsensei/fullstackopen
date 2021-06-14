import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      <Part title={parts[0].name} count={parts[0].exercises} />
      <Part title={parts[1].name} count={parts[1].exercises} />
      <Part title={parts[2].name} count={parts[2].exercises} />
    </>
  );
};

const Footer = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const Part = ({ title, count }) => {
  return (
    <p>
      {title} {count}
    </p>
  );
};

export default App;
