import React from "react";
const SearchFilter = ({ setQueryText }) => {
  return (
    <p>
      filter shown with{" "}
      <input
        onChange={(e) => {
          setQueryText(e.target.value);
        }}
        type="text"
      />
    </p>
  );
};

export default SearchFilter;
