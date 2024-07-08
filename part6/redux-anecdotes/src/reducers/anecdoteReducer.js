import initialState, { getId } from "./initialState";

// action creators
export const createAnecdote = (content) => {
  return {
    type: "CREATE_ANECDOTE",
    payload: content,
  };
};

export const vote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: id,
  };
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return {
        ...state,
        anecdotes: [
          ...state.anecdotes,
          {
            content: action.payload,
            id: getId(),
            votes: 0,
          },
        ],
      };
    case "ADD_VOTE": {
      const votedAnecdote = state.anecdotes.filter(
        (el) => el.id === action.payload
      )[0];
      votedAnecdote.votes = votedAnecdote.votes + 1;
      const updatedAnecdotes = state.anecdotes.map((el) =>
        el.id !== action.payload ? el : votedAnecdote
      );
      return {
        ...state,
        anecdotes: updatedAnecdotes,
      };
    }
    default:
      return state;
  }
};

export default anecdoteReducer;
