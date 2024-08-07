import { useState, useEffect, useRef } from "react";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const API_KEY = "9d45261bda5cb03e32a634d21dfa1a14";

const Weather = () => {
  let [city, setCity] = useState(null);
  let input_value = useRef();
  let Data = [];

  function handleclick() {
    const data = input_value.current.value;
    setCity(data);
  }
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(`${API_URL}&q=${city}&appid=${API_KEY}`);
      Data = await res.json();
      console.log(Data);
    };
    fetchdata();
  }, [city]);

  return (
    <div class="main_container ">
      <div class="search_container">
        <input ref={input_value} type="text" />
        <img
          onClick={handleclick}
          src="../images/search.png"
          alt="Search Icon"
        />
      </div>
      <div class="content">
        <img src="../images/clear.png" alt="Clear Icon" />
        <h1>22°C</h1>
       {Data && <h3>{`${Data.name}`}</h3>}
      </div>
      <div class="footer">
        <div class="humidity">
          <img src="../images/humidity.png" alt="Humidity Icon" />
          <div class="humidity_content">
            <p>53%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div class="Wind_Speed">
          <img src="../images/wind.png" alt="Wind Icon" />
          <div class="wind_content">
            <p>5.63 km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;