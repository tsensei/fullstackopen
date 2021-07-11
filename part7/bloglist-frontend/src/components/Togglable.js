import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  let hideWhenVisible = { display: visible ? "none" : "" };
  let showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="toggleButton">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
export default Togglable;
