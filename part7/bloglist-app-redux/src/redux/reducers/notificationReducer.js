import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    test(state, action) {
      return state;
    },
  },
});

export const { test } = notificationReducer.actions;
export default notificationReducer.reducer;
