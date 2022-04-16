import { useState } from "react";
import { countries } from "./countries";
import "./App.css";

function App() {
  const [country, setCountry] = useState(null);

  const setTheCountry = (countryData) => {
    setCountry({
      name: countryData[0].name.common,
      capital: countryData[0].capital?.[0] ?? "No Capital",
      flag: countryData[0].flags.png,
      population: countryData[0].population,
      languages:
        countryData[0].languages !== undefined
          ? Object.values(countryData[0].languages).join(", ")
          : "No Languages",
      currencies:
        countryData[0].currencies !== undefined
          ? `${Object.values(countryData[0].currencies)[0].name} (${
              Object.values(countryData[0].currencies)[0].symbol
            })`
          : "No Currencies",
      borders:
        countryData[0].borders?.map((border) => {
          return (
            <button
              key={border}
              onClick={viewNeighbour}
              type="button"
              className="btn neighBtn btn-secondary btn-sm"
            >
              {border}
            </button>
          );
        }) ?? "No Neighbours",
    });
  };

  const fetchDetails = (countryName) => {
    fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    ).then(async (res) => {
      const countryData = await res.json();
      setTheCountry(countryData);
    });
  };

  const changeCountry = () => {
    const randomCountry = countries[Math.floor(Math.random() * 250)];
    fetchDetails(randomCountry);
  };

  const viewNeighbour = (event) => {
    const code = event.target.outerText;
    fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(async (res) => {
      const countryData = await res.json();
      setTheCountry(countryData);
    });
  };

  return (
    <div className="App container">
      <button
        onClick={changeCountry}
        type="button"
        className="btn randomButton btn-outline-primary"
      >
        Generate Random Country!
      </button>
      {country === null ? (
        fetchDetails("India")
      ) : (
        <div className="card text-white border-dark bg-dark mb-3 mainCard">
          <img src={country.flag} className="card-img-top" alt="flag" />
          <div className="card-body">
            <h5 className="card-title">{country.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Capital: <strong>{country.capital}</strong>
            </li>
            <li className="list-group-item">
              Population: <strong>{country.population}</strong>
            </li>
            <li className="list-group-item">
              Languages: <strong>{country.languages}</strong>
            </li>
            <li className="list-group-item">
              Currencies: <strong>{country.currencies}</strong>
            </li>
            <li className="list-group-item">Borders: {country.borders}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
