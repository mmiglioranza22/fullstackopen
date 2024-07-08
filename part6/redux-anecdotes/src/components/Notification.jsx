import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification.notification);
  const [style, setStyle] = useState({
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: "none",
  });

  useEffect(() => {
    let timer = null;
    if (notification !== "") {
      setStyle((prev) => ({ ...prev, display: "flex" }));
      timer = setTimeout(() => {
        setStyle((prev) => ({ ...prev, display: "none" }));
        clearNotification();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  return <div style={style}>{notification}</div>;
};

export default Notification;
