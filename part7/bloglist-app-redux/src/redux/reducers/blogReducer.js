import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogService";

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
        blog.id !== action.payload.id ? blog : action.payload,
      );
      return updatedBlogs;
    },
    removeBlog(state, action) {
      const updatedBlogs = state.filter(
        (blog) => blog.id !== action.payload.id,
      );
      return updatedBlogs;
    },
  },
});

export const { initializeBlogs, newBlog, voteBlog, removeBlog } =
  blogReducer.actions;

export const fetchAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(initializeBlogs(blogs));
  };
};

export const postBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    dispatch(newBlog(response));
  };
};

export const updateBlog = (blog, payload) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog, payload);
    dispatch(voteBlog(updatedBlog));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blogId);
    dispatch(removeBlog(removedBlog));
  };
};

export default blogReducer.reducer;
