import { useState, useEffect } from "react";
import { getCountry } from "./services/countryService";

const Info = ({ data }) => {
  const filteredKeys = Object.keys(data.languages);
  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>capital {data.capital}</p>
      <p>area {data.area}</p>
      <h2>Languages:</h2>
      <ul>
        {filteredKeys.map((key) => (
          <li key={key}>{data.languages[key]}</li>
        ))}
      </ul>
      <img
        src={data.flags.png}
        alt={`flag of ${data.name.common}`}
        width="400"
        height="200"
      />
    </div>
  );
};

const Country = ({ country }) => {
  return <li>{country.name.common}</li>;
};

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country, index) => (
          <Country key={index} country={country} />
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <Info data={countries[0]} />
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getCountry().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setFilter(
      countries.filter((countries) =>
        countries.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <div>
      <div>
        find countries <input onChange={handleInput} />
      </div>
      <CountryList countries={filter} />
    </div>
  );
};

export default App;
