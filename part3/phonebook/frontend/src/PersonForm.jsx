const PersonForm = ({
  handleSubmit,
  handleNameInput,
  handleNumberInput,
  newName,
  number,
}) => {
  return (
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
  );
};

export default PersonForm;
