import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [nextId, setNextId] = useState(2);

  const handleNameInput = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNumber("");
    } else {
      const newPerson = { id: nextId, name: newName, number: number };
      setPersons([...persons, newPerson]);
      setNewName("");
      setNumber("");
      setNextId(nextId + 1);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
