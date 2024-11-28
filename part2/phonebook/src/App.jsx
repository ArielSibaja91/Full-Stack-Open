import { useEffect, useState } from "react";
import personService from "./services/personService";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getPersons()
      .then((persons) => {
        setPersons(persons);
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
      personService
        .addPerson(newPerson)
        .then((addedPerson) => {
          setPersons([...persons, addedPerson]);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
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
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
