import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../redux/reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification) {
    return null;
  }

  return (
    <div
      data-testid="notification"
      style={{
        background: "lightgrey",
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
