import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmitAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value;
    dispatch(newAnecdote(content));
    dispatch(updateNotification(`You have created a note: '${content}'`, 5001));
    ev.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
