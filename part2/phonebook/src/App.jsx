import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [nextId, setNextId] = useState(persons.length + 1);
  const [filter, setFilter] = useState("");

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
      const newPerson = { id: nextId, name: newName, number: number };
      setPersons([...persons, newPerson]);
      setNewName("");
      setNumber("");
      setNextId(nextId + 1);
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
      <div>
        filter shown with <input value={filter} onChange={handleFilterInput} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
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
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
