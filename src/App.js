import React, { useState } from "react";
import Loader from "./loader"; 

const API_KEY = "c9cdb2db46434d53b3c85745250208"; 

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial", marginTop: "50px" }}>
      <h1>🌤️ Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={fetchWeatherData}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "30px" }}>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <h3>{weatherData.current.condition.text}</h3>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <p>🌡️ Temp: {weatherData.current.temp_c} °C</p>
          <p>💧 Humidity: {weatherData.current.humidity}%</p>
          <p>🌬️ Wind: {weatherData.current.wind_kph} km/h</p>
          <p>🔽 Pressure: {weatherData.current.pressure_mb} hPa</p>
        </div>
      )}
    </div>
  );
}

export default App;
