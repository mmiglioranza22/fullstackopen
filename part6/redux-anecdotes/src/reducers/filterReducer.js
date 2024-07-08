import initialState from "./initialState";

// action creators
export const setFilter = (input) => {
  return {
    type: "SET_FILTER",
    payload: input,
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
