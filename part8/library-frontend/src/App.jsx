import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [loggedUser, setLoggedUser] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged_user");
    if (logged) {
      setLoggedUser(true);
    }
    return () => {
      setLoggedUser(false);
    };
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("logged_user", token);
    setLoggedUser(true);
    setPage("authors");
  };
  const handleLogout = () => {
    localStorage.clear();
    setLoggedUser(false);
    setPage("login");
  };

  return (
    <div>
      <div>
        {!loggedUser ? (
          <LoginForm handleLogin={handleLogin} />
        ) : (
          <>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>

      {loggedUser && (
        <>
          <Authors show={page === "authors"} />

          <Books show={page === "books"} />

          <NewBook show={page === "add"} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;
