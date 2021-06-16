import React from "react";
import Country from "./Country";
const Countries = ({ filteredCountries, setFilteredCountries }) => {
  const showCountry = (country) => {
    setFilteredCountries([country]);
  };
  if (filteredCountries.length > 10) {
    return "Too many matches, specify another filter";
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return (
      <ul>
        {filteredCountries.map((country) => {
          return (
            <li key={country.numericCode}>
              {country.name}
              <button onClick={() => showCountry(country)}>show</button>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Countries;
