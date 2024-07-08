import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...state,
        notification: action.payload,
      };
    },
    clearNotification(state) {
      return { ...state, notification: "" };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
