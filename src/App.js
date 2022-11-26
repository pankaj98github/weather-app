import "./App.css";
import React, { useEffect, useState } from "react";
import SearchField from "react-search-field";
import { ImLocation2 } from "react-icons/im";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FiCommand } from "react-icons/fi";
import { TbWind } from "react-icons/tb";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("nagpur");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a2d490320db13cf251b20b7b40e40b3f`
      )
      .then((res) => {
        setTemp(res.data.main.temp);
        setPressure(res.data.main.pressure);
        setHumidity(res.data.main.humidity);
        setWind(res.data.wind.speed);
        setCity(res.data.name);
      });
  }, [search]);

  return (
    <div className="weather-box">
      <div className="weather-header">
        <h1>Check Weather 🌞</h1>
      </div>

      <div className="weather-search">
        <SearchField
          placeholder="Search..."
          onSearchClick={(value) => {
            setSearch(value);
          }}
          searchText={search}
          classNames="weather-input"
        />
      </div>

      <div className="weather-cloud">
        <br />
        <ImLocation2 size="3rem" />
      </div>

      <div className="weather-city">
        <h1>{city}</h1>
      </div>

      <div className="weather-row">
        <div className="weather-column">
          <FaTemperatureHigh size="1.7rem" />
          <p>Temp: {(temp - 273.15).toFixed(2)}°C</p>
        </div>

        <div className="weather-column">
          <FiCommand size="1.7rem" />
          <p>Pressure: {pressure}</p>
        </div>
      </div>

      <div className="weather-row">
        <div className="weather-column">
          <WiHumidity size="1.7rem" />
          <p>Humidity: {humidity}</p>
        </div>

        <div className="weather-column">
          <TbWind size="1.7rem" />
          <p>Wind: {wind}</p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default App;
