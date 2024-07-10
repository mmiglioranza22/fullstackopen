import { createContext, useReducer } from "react";

const initialState = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
