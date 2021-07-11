import { useState } from "react";

export const useField = (name, type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    if (typeof e !== "object") {
      setValue(e);
      return;
    }
    setValue(e.target.value);
  };

  return {
    name,
    type,
    value,
    onChange,
  };
};
