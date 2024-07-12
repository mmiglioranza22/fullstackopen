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

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const [message, setMessage] = useState(null);

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

  const handleBlogService = (loginData) => {
    let timer;
    blogService
      .login(loginData)
      .then((response) => {
        blogService.setToken(response.token);
        window.localStorage.setItem("loggedUser", JSON.stringify(response));
      })
      .catch((err) => {
        setMessage({
          message: `${err.response.data.error}`,
          error: true,
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  // Post blog logic ----
  const blogRef = useRef();

  const createBlog = (newBlog) => {
    let timer;
    blogService
      .create(newBlog)
      .then((response) => {
        setMessage({
          message: `${response.title} by ${user.name} added`,
        });
        blogRef.current.toggleVisibility();
        clearTimeout(timer);
        timer = setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((err) => {
        setMessage({
          message: `${err.response.data.message}`,
          error: true,
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };
  console.log({ blogs });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Notification message={message} />
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
              <BlogForm />
            </Togglable>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <Blog key={blog.id + "-" + i} blog={blog} />
              ))
            ) : (
              <p>No blogs</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
