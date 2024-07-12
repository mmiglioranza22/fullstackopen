import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
