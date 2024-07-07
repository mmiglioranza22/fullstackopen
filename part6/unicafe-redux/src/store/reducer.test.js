import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    deepFreeze(state);
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("Good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("Ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
  test("Bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });
  test("Zero is incremented", () => {
    const actionGood = {
      type: "GOOD",
    };
    const state = initialState;

    const actionZero = {
      type: "ZERO",
    };
    deepFreeze(state);
    counterReducer(state, actionGood);
    const newState = counterReducer(state, actionZero);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
