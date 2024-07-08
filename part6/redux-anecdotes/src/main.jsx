import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import initialState from "./reducers/initialState";

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
});

const store = createStore(reducer, initialState);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
