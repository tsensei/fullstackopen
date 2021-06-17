import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
  );
};

export default Person;
