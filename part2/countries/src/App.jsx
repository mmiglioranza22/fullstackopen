import { useEffect, useState } from "react";
import axiosService from "./services/axios";

const Search = ({ search, handleSearch }) => {
  return (
    <div>
      find countries: <input onChange={handleSearch} value={search} />
    </div>
  );
};

const Country = ({ country }) => {
  console.log(country);
  return (
    <div style={{ display: "flex" }}>
      <p>{/* {person.name} {person.number} */}a</p>
    </div>
  );
};

const Countries = ({ countries }) => {
  return countries.map((country, i) => {
    return <Country key={i} country={country} />;
  });
};

const CountryDetail = ({ detail }) => {
  console.log({ detail });
  const { name, capital, area, languages, flags } = detail;

  return (
    <div>
      <h1>{name.common}</h1>
      <br />
      <p>capital: {capital[0]}</p>
      <p>area: {area}</p>
      <br />
      <p style={{ fontWeight: "bold" }}>languages</p>
      <ul>
        {Object.values(languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosService.getCountry(search).then((data) => {
      setCountries(data);
    });
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  console.log(Object.keys(countries).length);

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      {countries ? (
        !Array.isArray(countries) ? (
          <CountryDetail detail={countries} />
        ) : Array.isArray(countries) && countries.length >= 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <Countries countries={countries} />
        )
      ) : null}
    </div>
  );
};

export default App;
