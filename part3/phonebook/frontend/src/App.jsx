import { useEffect, useState } from "react";
import personService from "./services/personService";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notificaction";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [classType, setClassType] = useState("");

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
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: number };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Updated ${updatedPerson.name} number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            if (error.response && error.response.status === 404) {
              setPersons(
                persons.filter((person) => person.id !== existingPerson.id)
              );
              setMessage(
                `Information of ${existingPerson.name} has already been removed from server`
              );
            } else {
              setMessage(`An error occurred updating ${existingPerson.name}`);
            }
            setClassType("error");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNumber("");
          });
      }
    } else {
      const newPerson = { name: newName, number: number };
      personService
        .addPerson(newPerson)
        .then((addedPerson) => {
          setPersons([...persons, addedPerson]);
          setMessage(`Added ${addedPerson.name}`);
          setClassType("success");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setClassType("error");
          setMessage(`Error adding ${addedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNumber("");
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Deleted ${name}`);
          setClassType("success");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setClassType("error");
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
      <Notification message={message} classType={classType} />
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
