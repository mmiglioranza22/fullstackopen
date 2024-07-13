import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/reducers/userReducer";
import { fetchAllBlogs } from "./redux/reducers/blogReducer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import UsersList from "./views/UsersList";
import UserDetail from "./views/UserDetail";
import BlogsList from "./views/BlogsList";
import BlogDetail from "./views/BlogDetail";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
      blogService.setToken(JSON.parse(loggedUser)?.token);
    }
  }, []);

  useEffect(() => {
    // should bring only those blogs related to the user
    if (user) {
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(fetchAllBlogs());
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
  };

  // Post blog logic toggle ----
  const blogRef = useRef();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Notification />
      <h2>blogs</h2>
      {!user ? (
        <>
          <h2>login to application</h2>
          <LoginForm />
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <p>{user.name} logged in</p>
            <button style={{ width: "fit-content" }} onClick={handleLogout}>
              log out
            </button>
            <Togglable buttonLabel="Create blog" ref={blogRef}>
              <BlogForm close={() => blogRef.current.toggleVisibility()} />
            </Togglable>
            <Routes>
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/blogs" element={<BlogsList blogs={blogs} />} />
              <Route path="/users" element={<UsersList />} />

              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
