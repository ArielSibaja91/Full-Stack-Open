import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [nextId, setNextId] = useState(2);

  const handleInput = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { id: nextId, name: newName };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNextId(nextId + 1);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
