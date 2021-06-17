import React from "react";
import Person from "./Person";

const RenderPersons = ({ persons, deletePerson, filterArray }) => {
  return (
    <>
      {persons.map((person, index) =>
        filterArray[index] === 1 ? (
          <Person deletePerson={deletePerson} key={index} person={person} />
        ) : (
          ""
        )
      )}
    </>
  );
};

export default RenderPersons;
