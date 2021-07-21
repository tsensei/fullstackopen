import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FAV_GENRE } from "../queries";

const Recommend = ({ show, books }) => {
  const [getGenre, result] = useLazyQuery(GET_FAV_GENRE);
  const [favouriteGenre, setFavouriteGenre] = useState(null);

  useEffect(() => {
    getGenre();
  }, []);

  useEffect(() => {
    if (result.data) {
      setFavouriteGenre(result.data.me.favouriteGenre);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }
  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favourite genre <b>{favouriteGenre}</b>
      </p>
      {favouriteGenre ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => {
              return a.genres.includes(favouriteGenre) ? (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Recommend;
