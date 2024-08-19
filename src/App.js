import React, { useEffect, useState } from "react";
import DispalayData from "./Display";
import Loading from "./Loading";

export default function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchCity(city) {
    try {
      const responsecity = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=243baa22325b435a972e9816ac73d862`
      );
      const cityData = await responsecity.json();
      const { lat, lng } = cityData.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  async function fetchWeather(city) {
    setLoading(true);
    const coordinates = await fetchCity(city);
    if (!coordinates) {
      setLoading(false);
      return;
    }
    const { latitude, longitude } = coordinates;
    const daily = "temperature_2m_max,temperature_2m_min";
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=auto`
      );
      const Data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setWeatherData(Data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchWeather(location);
  }, [location]);
  return (
    <div className="app">
      <h1>Classy weather</h1>
      <div>
        <input
          type="text"
          placeholder="Search from Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {loading ? (
        <Loading />
      ) : weatherData ? (
        <DispalayData weatherData={weatherData.daily} location={location} />
      ) : (
        <p>No data available</p>
      )}
      <button onClick={fetchWeather}>Get Weather</button>
    </div>
  );
}
