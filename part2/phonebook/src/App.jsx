import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
  }, []);

  const handleNameInput = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  const handleFilterInput = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNumber("");
    } else {
      const newPerson = { name: newName, number: number };
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
  };

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterInput={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        number={number}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
