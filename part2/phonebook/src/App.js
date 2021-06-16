import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [queryText, setQueryText] = useState("");
  //Filter array for search functionality
  const [filterArray, setFilterArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);
  useEffect(() => {
    const newArr = [...filterArray];
    persons.forEach((person, index) => {
      if (person.name.toLowerCase().includes(queryText.toLowerCase())) {
        newArr[index] = 1;
      } else {
        newArr[index] = 0;
      }
    });
    setFilterArray(newArr);
  }, [queryText, persons]);
  console.log(filterArray);
  const nameRef = useRef();
  const numberRef = useRef();
  const updateName = (e) => {
    e.preventDefault();
    let personExists = persons.find((person) => {
      return person.name === nameRef.current.value;
    });
    if (personExists) {
      alert(`${nameRef.current.value} is already added to the phonebook`);
      nameRef.current.value = "";
      numberRef.current.value = "";
      return;
    }

    let person = {
      name: nameRef.current.value,
      number: numberRef.current.value,
      id: persons.length + 1,
    };
    setPersons(persons.concat(person));
    setFilterArray(filterArray.concat(1));
    nameRef.current.value = "";
    numberRef.current.value = "";
  };
  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter setQueryText={setQueryText} />
      <h3>add a new</h3>
      <AddForm
        updateName={updateName}
        nameRef={nameRef}
        numberRef={numberRef}
      />
      <h2>Numbers</h2>
      <RenderPersons persons={persons} filterArray={filterArray} />
    </div>
  );
};

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

const AddForm = ({ updateName, nameRef, numberRef }) => {
  return (
    <>
      <form onSubmit={updateName}>
        <div>
          name: <input ref={nameRef} />
        </div>
        <div>
          number: <input ref={numberRef} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const RenderPersons = ({ persons, filterArray }) => {
  return (
    <>
      {persons.map((person, index) =>
        filterArray[index] === 1 ? <Person person={person} /> : ""
      )}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  );
};

export default App;
