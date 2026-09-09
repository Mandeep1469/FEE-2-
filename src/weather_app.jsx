import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// 1. CUSTOM HOOK (Encapsulates API Logic)
function useWeather(initialCity = "Chandigarh") {
  const [city, setCity] = useState(initialCity);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found. Please try another city.");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch current weather conditions
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      const weatherData = await weatherRes.json();

      setData({
        city: name,
        country,
        tempC: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect: Runs when city state changes
  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  return { data, loading, error, setCity };
}

// 2. REUSABLE CARD COMPONENT
function Card({ children }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        maxWidth: "400px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}


// 3. SEARCH BAR COMPONENT
function SearchBar({ onSearch }) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);

  // useRef: Auto-focus the search field on first render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim()); // Lifting state up to App
      setInputVal("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter city (e.g., Delhi, London)..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "14px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Search
      </button>
    </form>
  );
}

// ==========================================
// 4. WEATHER DISPLAY COMPONENT
// Demonstrates: useMemo (Derived computation)
// ==========================================
function WeatherDisplay({ weather }) {
  // useMemo: Recalculates °F only when Celsius value changes
  const tempF = useMemo(() => {
    return ((weather.tempC * 9) / 5 + 32).toFixed(1);
  }, [weather.tempC]);

  return (
    <div style={{ textAlign: "center", color: "#1e293b" }}>
      <h2 style={{ margin: "4px 0", fontSize: "22px" }}>
        {weather.city}, {weather.country}
      </h2>

      <div style={{ margin: "16px 0" }}>
        <span style={{ fontSize: "44px", fontWeight: "700" }}>
          {Math.round(weather.tempC)}°C
        </span>
        <div style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
          ({tempF}°F)
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Humidity</span>
          <p style={{ margin: "4px 0", fontWeight: "600" }}>{weather.humidity}%</p>
        </div>
        <div>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Wind Speed</span>
          <p style={{ margin: "4px 0", fontWeight: "600" }}>{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const { data, loading, error, setCity } = useWeather("Chandigarh");

  // Handler passed down to receive search term (Lifting state up)
  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "16px",
      }}
    >
      <Card>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#0f172a",
          }}
        >
          🌤️ Weather App
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p style={{ textAlign: "center", color: "#64748b" }}>Fetching weather...</p>
        )}

        {error && (
          <div
            style={{
              padding: "10px",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && data && <WeatherDisplay weather={data} />}
      </Card>
    </div>
  );
}