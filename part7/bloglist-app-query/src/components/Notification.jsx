import { useContext, useEffect } from "react";
import NotificationContext from "../context/notificationContext";

const Notification = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext);

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(
        () => dispatchNotification({ type: "CLEAR_NOTIFICATION" }),
        5000,
      );
    }
    return () => clearTimeout(timer);
  }, [notification]);

  if (notification === null) {
    return null;
  }

  return (
    <div
      data-testid="notification"
      style={{
        background: "grey",
        border: notification.error ? "5px solid red" : "5px solid green",
        borderRadius: "5px",
        color: notification.error ? "red" : "green",
        fontSize: "20px",
      }}
    >
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
