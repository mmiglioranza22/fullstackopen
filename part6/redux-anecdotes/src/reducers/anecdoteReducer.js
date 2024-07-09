import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/index";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = {
//   anecdotes: anecdotesAtStart.map(asObject),
// };

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
    vote(state, action) {
      const updatedAnecdotes = state.map((el) =>
        el.id !== action.payload.id ? el : action.payload
      );
      return updatedAnecdotes;
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdote = anecdotes.filter((el) => el.id === id)[0];
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

    const updatedAnecdote = await anecdoteService.voteAnecdote(votedAnecdote);

    dispatch(vote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
