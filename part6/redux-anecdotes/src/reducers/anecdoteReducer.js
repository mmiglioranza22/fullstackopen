const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return [
        ...state,
        {
          content: action.payload,
          id: getId(),
          votes: 0,
        },
      ];
    case "ADD_VOTE": {
      const votedAnecdote = state.filter((el) => el.id === action.payload)[0];
      votedAnecdote.votes = votedAnecdote.votes + 1;
      return state.map((el) => (el.id !== action.payload ? el : votedAnecdote));
    }
    default:
      return state;
  }
};

export default reducer;
