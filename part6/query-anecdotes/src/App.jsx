import { useContext, useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./components/context/notificationContext";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext);

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(
        () => dispatchNotification({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    }
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
