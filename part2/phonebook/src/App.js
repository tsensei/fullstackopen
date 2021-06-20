import React, { useState, useRef, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddForm from "./components/AddForm";
import RenderPersons from "./components/RenderPersons";
import personService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
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

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
      setError(false);
    }, 3000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    let personExists = persons.find((person) => {
      // console.log(
      //   person.name,
      //   nameRef.current.value,
      //   person.name.trim().localeCompare(nameRef.current.value.trim())
      // );
      return person.name.trim().localeCompare(nameRef.current.value.trim()) ===
        0
        ? 1
        : 0;
    });
    console.log(personExists);
    if (personExists) {
      const willUpdatePerson = window.confirm(
        `${nameRef.current.value} is already added to the phonebook,replace the old number with a new one?`
      );
      if (willUpdatePerson) {
        const personObject = {
          ...personExists,
          number: numberRef.current.value,
        };
        personService
          .updatePerson(personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => {
                return person.id !== returnedPerson.id
                  ? person
                  : returnedPerson;
              })
            );
          })
          .then((_) =>
            handleNotification(`Updated ${personObject.name}'s number`)
          )
          .catch((error) => {
            console.log(error.response);
            handleNotification(error.response.data.message);
            setError(true);
          });
      }

      nameRef.current.value = "";
      numberRef.current.value = "";
      return;
    }

    let person = {
      name: nameRef.current.value,
      number: numberRef.current.value,
    };

    personService
      .createPerson(person)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
      .then((_) => setFilterArray(filterArray.concat(1)))
      .then((_) => handleNotification(`Created ${person.name}`))
      .catch((err) => {
        console.log(err.response);
        handleNotification(err.response.data.message);
        setError(true);
      });
    nameRef.current.value = "";
    numberRef.current.value = "";
  };

  const deletePerson = (id) => {
    let person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then((status) => {
        if (status === 200) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook!!</h2>
      <Notification error={error ? "red" : "green"} message={notification} />
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
