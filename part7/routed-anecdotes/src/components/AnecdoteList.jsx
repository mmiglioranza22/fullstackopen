import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {
          // eslint-disable-next-line react/prop-types
          anecdotes.map((anecdote) => (
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default AnecdoteList;
