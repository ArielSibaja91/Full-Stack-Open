import { useState, useEffect } from "react";
import { getCountry } from "./services/countryService";
import { getWeather } from "./services/openWeatherApi";

const CountryWeather = ({ country, latitude, longitude }) => {
  const [temp, setTemp] = useState(0);
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState(0);

  useEffect(() => {
    getWeather(latitude, longitude).then((response) => {
      setTemp(response.main.temp - 273.15);
      setIcon(
        `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`
      );
      setWind(response.wind.speed);
    });
  }, []);
  return (
    <div>
      <h2>Weather in {country}</h2>
      <p>Temperature {temp.toFixed(2)} Celcius</p>
      <img src={icon} width={200} height={200} />
      <p>wind {wind} m/s</p>
    </div>
  );
};

const Info = ({ data, show }) => {
  if (show === false) {
    return null;
  }

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
      <CountryWeather
        country={data.name.common}
        latitude={data.latlng[0]}
        longitude={data.latlng[1]}
      />
    </div>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
    <div>
      <li>
        {country.name.common} <button onClick={toggle}>show</button>
      </li>
      <Info data={country} show={show} />
    </div>
  );
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
        <Info data={countries[0]} show={true} />
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
