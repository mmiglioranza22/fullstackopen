import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogService";
import { setNotification } from "./notificationReducer";
import { fetchUsers } from "./usersReducer";

// handle errors how?

const initialState = null;
const blogReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    initializeBlogs(_state, action) {
      return action.payload;
    },
    newBlog(state, action) {
      return state.concat(action.payload);
    },
    voteBlog(state, action) {
      const updatedBlogs = state.map((blog) =>
        blog._id !== action.payload._id ? blog : action.payload,
      );
      return updatedBlogs;
    },
    removeBlog(state, action) {
      const updatedBlogs = state.filter(
        (blog) => blog._id !== action.payload._id,
      );
      return updatedBlogs;
    },
  },
});

export const { initializeBlogs, newBlog, voteBlog, removeBlog } =
  blogReducer.actions;

export const fetchAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(initializeBlogs(blogs));
    } catch (err) {
      dispatch(
        setNotification({
          message: `${err.response.data.message}`,
          error: true,
        }),
      );
    }
  };
};

export const postBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      dispatch(newBlog(response));
      // dispatch(fetchAllBlogs());
      dispatch(fetchUsers());
      dispatch(
        setNotification({
          message: `A new blog '${response.title}' was added`,
          error: false,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          message: `${err.response.data.message}`,
          error: true,
        }),
      );
    }
  };
};

export const updateBlog = (blog, payload) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog, payload);
      dispatch(voteBlog(updatedBlog));
      dispatch(
        setNotification({
          message: `Blog '${updatedBlog.title}' was voted`,
          error: false,
        }),
      );
    } catch (err) {
      console.log({ err });

      dispatch(
        setNotification({
          message: `${err.response.data.message ?? err.response.data.error}`,
          error: true,
        }),
      );
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      const removedBlog = await blogService.remove(blogId);
      dispatch(removeBlog(removedBlog));
      dispatch(
        setNotification({
          message: "Blog deleted",
          error: false,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          message: `${err.response.data.message}`,
          error: true,
        }),
      );
    }
  };
};

export default blogReducer.reducer;
