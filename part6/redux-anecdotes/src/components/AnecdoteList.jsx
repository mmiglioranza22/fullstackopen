import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(updateNotification(`You have voted '${anecdote.content}'`, 5001));
  };

  // return <></>;
  // anecdotes array need to be wrapped and destructured since sort orders elements in place => mutates and returns same array
  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter((anecdote) =>
      filter !== "" ? anecdote.content.includes(filter) : anecdote
    )
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};
export default AnecdoteList;
