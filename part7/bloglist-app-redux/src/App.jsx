import { useEffect, useRef } from "react";
import {
  Link,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import blogService from "./services/blogService";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
// import Home from "./views/Home";
import UsersList from "./views/UsersList";
import UserDetail from "./views/UserDetail";
import BlogsList from "./views/BlogsList";
import BlogDetail from "./views/BlogDetail";

import { fetchUsers } from "./redux/reducers/usersReducer";
import { clearUser, setUser } from "./redux/reducers/userReducer";
import { fetchAllBlogs } from "./redux/reducers/blogReducer";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  // window.onpopstate = (ev) => {
  //   navigate("/users");
  // };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
      blogService.setToken(JSON.parse(loggedUser)?.token);
    }
  }, []);

  useEffect(() => {
    // should bring only those blogs related to the user
    if (loggedUser) {
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      dispatch(fetchAllBlogs());
      dispatch(fetchUsers());

      navigate("/users");
    }
  }, [loggedUser]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());

    navigate("/");
  };

  // Post blog logic toggle ----
  const blogRef = useRef();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Notification />

      {!loggedUser ? (
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
            <nav
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                paddingLeft: "8px",
                backgroundColor: "lightgrey",
              }}
            >
              {/* <Link to="/">Home</Link> */}
              <Link to="/blogs">Blogs</Link>
              <Link to="/users">Users</Link>
              <p>{loggedUser.name} logged in</p>
              <button style={{ width: "fit-content" }} onClick={handleLogout}>
                log out
              </button>
            </nav>
            <h2>blog app</h2>
            <Togglable buttonLabel="Create blog" ref={blogRef}>
              <BlogForm close={() => blogRef.current.toggleVisibility()} />
            </Togglable>
            <Routes>
              <Route
                path="/users/:userId"
                element={<UserDetail users={users} />}
              />
              <Route
                path="/blogs/:blogId"
                element={<BlogDetail blogs={blogs} />}
              />
              <Route path="/blogs" element={<BlogsList blogs={blogs} />} />
              <Route path="/users" element={<UsersList users={users} />} />
              {/* <Route path="/" element={<Home />} /> */}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
