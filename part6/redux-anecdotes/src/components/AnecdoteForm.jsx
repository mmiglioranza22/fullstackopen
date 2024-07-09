import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/index";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmitAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value;
    anecdoteService
      .createNew(content)
      .then((anecdote) => dispatch(createAnecdote(anecdote)));
    dispatch(setNotification(`You have created a note: '${content}'`));
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
