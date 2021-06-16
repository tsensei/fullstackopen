import React from "react";

const Filter = ({ countries, setFilteredCountries }) => {
  const handleQuery = (e) => {
    const query = e.target.value;
    let filterArray = countries.filter((country) => {
      return country.name.toLowerCase().includes(query.toLowerCase());
    });
    console.log(filterArray);
    setFilteredCountries(filterArray);
  };
  return (
    <>
      find countries <input onChange={(e) => handleQuery(e)} type="text" />
    </>
  );
};

export default Filter;
