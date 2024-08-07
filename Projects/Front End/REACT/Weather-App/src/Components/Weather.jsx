import { useState, useRef } from "react";
import useWeatherData from "./useWeatherData";

const Weather = () => {
  const [city, setCity] = useState("");
  const inputValue = useRef();
  const weatherData = useWeatherData(city);

  const handleclick = () => {
    const data = inputValue.current.value;
    if (data === '') {
      alert("Please enter a city name");
    } else {
      setCity(data);
    }
  };

  return (
    <div className="main_container">
      <div className="search_container">
        <input ref={inputValue} type="text" />
        <img
          onClick={handleclick}
          src="../images/search.png"
          alt="Search Icon"
        />
      </div>
      <div className="content">
        <img src={weatherData ? `../images/${weatherData.weather[0].main}.png` : `../images/Clear.png`} alt="Weather Icon" />
        <h1>{weatherData ? Math.round(weatherData.main.temp) : "--"}°C</h1>
        <h3>{weatherData ? weatherData.name : "Please Enter any city"}</h3>
      </div>
      <div className="footer">
        <div className="humidity">
          <img src="../images/humidity.png" alt="Humidity Icon" />
          <div className="humidity_content">
            <p>{weatherData ? weatherData.main.humidity : "--"}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="Wind_Speed">
          <img src="../images/wind.png" alt="Wind Icon" />
          <div className="wind_content">
            <p>{weatherData ? weatherData.wind.speed : "--"} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
