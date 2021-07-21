import React, { useEffect, useState } from "react";
import SetBirthyear from "./SetBirthyear";
import { useLazyQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries";

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const [getAuthors, result] = useLazyQuery(GET_AUTHORS);

  useEffect(() => {
    getAuthors();
  }, []);

  useEffect(() => {
    if (result.data && result.data.allAuthors) {
      setAuthors(result.data.allAuthors);
      console.log(result.data.allAuthors);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthyear
        options={authors.map((author) => {
          return {
            value: author.name,
            label: author.name,
          };
        })}
      />
    </div>
  );
};

export default Authors;
