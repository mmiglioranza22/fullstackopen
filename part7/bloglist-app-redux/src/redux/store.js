import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = {
  loggedUser: userReducer,
  blogs: blogReducer,
  notification: notificationReducer,
  users: usersReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

// tests
export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export default store;
