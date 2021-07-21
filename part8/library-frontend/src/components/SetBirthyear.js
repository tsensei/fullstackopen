import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { SET_AUTHOR_BIRTH, GET_AUTHORS } from "../queries";

const SetBirthyear = ({ options }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");
  const [setAuthorBirth] = useMutation(SET_AUTHOR_BIRTH, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    setAuthorBirth({
      variables: { name: name.value, setBornTo: parseInt(born) },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h1>Set Birthyear</h1>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born{" "}
          <input
            type="text"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
