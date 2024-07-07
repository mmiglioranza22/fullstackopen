import store from "./store";

export const good = () => {
  store.dispatch({
    type: "GOOD",
  });
};

export const bad = () => {
  store.dispatch({
    type: "BAD",
  });
};

export const ok = () => {
  store.dispatch({
    type: "OK",
  });
};
export const zero = () => {
  store.dispatch({
    type: "ZERO",
  });
};
