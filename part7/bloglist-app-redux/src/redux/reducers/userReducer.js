import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { setNotification } from "./notificationReducer";

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
    try {
      const user = await userService.login(credentials);
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
      dispatch(
        setNotification({
          message: `${err.response.data.error}`,
          error: true,
        }),
      );
    }
  };
};

export default userReducer.reducer;
