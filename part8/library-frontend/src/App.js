import { useApolloClient } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import LoginForm from "./components/LoginForm";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
const App = () => {
  const [page, setPage] = useState("authors");
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <LoginForm
        show={page === "login"}
        setPage={setPage}
        setToken={setToken}
      />

      <Books show={page === "books"} books={books} setBooks={setBooks} />

      <NewBook show={page === "add"} setPage={setPage} />

      <Recommend show={page === "recommend"} books={books} />
    </div>
  );
};

export default App;
