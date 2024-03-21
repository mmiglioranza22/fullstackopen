import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilter }) => {
  <div>
    filter shown with: <input onChange={handleFilter} value={filter} />
  </div>;
};

const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmit,
}) => {
  <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={handleChangeName} value={newName} />
    </div>
    <div>
      number: <input onChange={handleChangeNumber} value={newNumber} />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>;
};

const Persons = ({ persons, filter }) => {
  return filter
    ? persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person, i) => {
          return (
            <p key={person.name + i}>
              {person.name} {person.number}
            </p>
          );
        })
    : persons.map((person, i) => {
        return (
          <p key={person.name + i}>
            {person.name} {person.number}
          </p>
        );
      });
};

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      const data = res.data;
      setPersons(data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.findIndex((person) => person.name === newName) !== -1)
      return alert(`${newName} is already added to phonebook`);
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {persons ? <Persons persons={persons} filter={filter} /> : null}
    </div>
  );
};

export default App;
