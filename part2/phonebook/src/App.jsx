import { useEffect, useState } from "react";
import axiosService from "./services/axios";

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with: <input onChange={handleFilter} value={filter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmit,
}) => {
  return (
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
    </form>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  return filter
    ? persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => {
          return (
            <Person
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          );
        })
    : persons.map((person) => {
        return (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        );
      });
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        background: "grey",
        border: message.error ? "5px solid red" : "5px solid green",
        borderRadius: "5px",
        color: message.error ? "red" : "green",
        fontSize: "20px",
      }}
    >
      <p>{message.message}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axiosService.getAll().then((data) => {
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
    let timer = null;
    if (persons.findIndex((person) => person.name === newName) !== -1) {
      const confirmed = confirm(
        `${newName} is already added to phonebook, replate the old number with a new one?`
      );
      if (confirmed) {
        const personId = persons.find((p) => p.name === newName).id;
        axiosService
          .update(personId, { name: newName, number: newNumber })
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== data.id ? p : data)));
          })
          .catch(() => {
            setMessage({
              message: `Information of ${newName} has already been removed from server`,
              error: true,
            });
            clearTimeout(timer);
            timer = setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      axiosService.create({ name: newName, number: newNumber }).then((data) => {
        setPersons(persons.concat(data));
        setMessage({ message: `Added ${newName}`, error: false });
        clearTimeout(timer);
        timer = setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    axiosService.deletePerson(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      {persons ? (
        <Persons
          persons={persons}
          filter={filter}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
};

export default App;
