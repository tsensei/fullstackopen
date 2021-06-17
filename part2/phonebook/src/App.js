import React, { useState, useRef, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddForm from "./components/AddForm";
import RenderPersons from "./components/RenderPersons";
import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const nameRef = useRef();
  const numberRef = useRef();

  useEffect(() => {
    personService.getPersons().then((data) => setPersons(data));
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

  const addPerson = (e) => {
    e.preventDefault();
    let personExists = persons.find((person) => {
      return person.name === nameRef.current.value;
    });
    if (personExists) {
      const willUpdatePerson = window.confirm(
        `${nameRef.current.value} is already added to the phonebook,replace the old number with a new one?`
      );
      if (willUpdatePerson) {
        const personObject = {
          ...personExists,
          number: numberRef.current.value,
        };
        personService.updatePerson(personObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) => {
              return person.id !== returnedPerson.id ? person : returnedPerson;
            })
          );
        });
      }
      nameRef.current.value = "";
      numberRef.current.value = "";
      return;
    }

    let person = {
      name: nameRef.current.value,
      number: numberRef.current.value,
      id: persons.length + 1,
    };

    personService
      .createPerson(person)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
      .then((_) => setFilterArray(filterArray.concat(1)));
    nameRef.current.value = "";
    numberRef.current.value = "";
  };

  const deletePerson = (id) => {
    let person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then((statusCode) => {
        if (statusCode === 200) {
          setPersons(
            persons.filter((person) => {
              return person.id !== id;
            })
          );
          alert("Successfully deleted");
        }
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter setQueryText={setQueryText} />
      <h3>add a new</h3>
      <AddForm addPerson={addPerson} nameRef={nameRef} numberRef={numberRef} />
      <h2>Numbers</h2>
      <RenderPersons
        deletePerson={deletePerson}
        persons={persons}
        filterArray={filterArray}
      />
    </div>
  );
};

export default App;
