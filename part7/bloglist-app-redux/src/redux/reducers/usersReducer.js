import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { setNotification } from "./notificationReducer";

const initialState = null;
const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(_state, action) {
      return action.payload;
    },
    clearUsers() {
      return null;
    },
  },
});

export const { setUsers, clearUsers } = usersReducer.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const user = await userService.getAll();
      dispatch(setUsers(user));
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

export default usersReducer.reducer;
