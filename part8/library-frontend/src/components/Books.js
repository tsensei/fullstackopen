import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_GENRE_BOOKS } from "../queries";

const Books = ({ show, books, setBooks }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState(["all"]);
  const [filter, setFilter] = useState("all");
  const [getBooks, result] = useLazyQuery(GET_GENRE_BOOKS);

  useEffect(() => {
    getBooks({ variables: { genre: filter } });
  }, [filter]);

  useEffect(() => {
    if (result.data && result.data.genreBooks) {
      setBooks(result.data.genreBooks);
      setFilteredBooks(result.data.genreBooks);
    }
  }, [result.data]);

  useEffect(() => {
    console.log(books);
    books.forEach((b) => {
      b.genres.forEach((genre) => {
        setFilters((prevFilter) => {
          return prevFilter.includes(genre)
            ? prevFilter
            : [...prevFilter, genre];
        });
      });
    });
  }, [books]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="filters">
        {filters.map((f) => {
          return (
            <button onClick={(e) => setFilter(e.target.value)} value={f}>
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
