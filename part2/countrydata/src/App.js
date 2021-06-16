import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);
  return (
    <>
      <Filter
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <ul>
        {countries.length ? (
          <Countries
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
          />
        ) : (
          "Please wait"
        )}
      </ul>
    </>
  );
};

export default App;
