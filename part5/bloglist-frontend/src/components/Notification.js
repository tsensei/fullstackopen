import React from "react";

const Notification = ({ message, error }) => {
  console.log(error);
  let baseColor = error ? "red" : "#017e01";
  console.log(baseColor);
  return (
    <div
      style={{
        color: baseColor,
        border: `3px solid ${baseColor}`,
        backgroundColor: "#d3d3d3",
        padding: "10px",
        fontSize: "1.5rem",
        borderRadius: "8px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
