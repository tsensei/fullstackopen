import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_OWM}&units=metric`
      )
      .then((res) => setWeatherInfo(res.data));
  }, []);
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital:{country.capital}</p>
      <p>polpulation:{country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) => {
          return <li key={index}>{language.name}</li>;
        })}
      </ul>
      <img height="240px" width="400px" src={country.flag} alt="country flag" />
      {weatherInfo && <Weather weatherInfo={weatherInfo} />}
    </>
  );
};

const Weather = ({ weatherInfo }) => {
  return (
    <>
      <h2>Weather in {weatherInfo.name}</h2>
      <p>
        <b>temperature:</b> {weatherInfo.main.temp}
      </p>
      <p>
        <b>wind:</b>
        {weatherInfo.wind.speed} kmph {weatherInfo.wind.deg} deg
      </p>
    </>
  );
};

export default Country;
