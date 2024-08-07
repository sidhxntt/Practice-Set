import { useState, useEffect } from "react";

const useWeatherData = (city ) => {
  const [weatherData, setWeatherData] = useState(null);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  // Fetch weather data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}&q=${city}&appid=${API_KEY}`);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.log(error.message);
        alert("Failed to fetch weather data. Please try again later.");
      }
    };

    if (city !== "") {
      fetchData();

    }
  }, [city]);

  return weatherData;
};

export default useWeatherData;
