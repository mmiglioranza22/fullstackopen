import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });
    // console.log({ name, born });

    setName("");
    setBorn("");
  };

  const authors = result.data?.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select
          name="born"
          id="born"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          {authors?.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
