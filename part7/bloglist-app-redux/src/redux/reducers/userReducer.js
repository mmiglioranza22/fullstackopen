import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const initialState = null;
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials);
    dispatch(setUser(user));
  };
};

export default userReducer.reducer;
