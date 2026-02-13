import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { weatherAPI } from '../api';

function Weather({ user, onLogout }) {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await weatherAPI.get(city);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>🌾 Farmer Advisory System</h2>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <span>{user?.name}</span>
          <button onClick={onLogout} className="btn btn-logout">Logout</button>
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <h1>🌤️ Weather Advisory</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Real-time weather updates and farming advisory
          </p>

          {error && <div className="error">{error}</div>}

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={city} onChange={handleCityChange} className="form-group" style={{ flex: 1 }}>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button onClick={fetchWeather} className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>

          {weather && (
            <div style={{ marginTop: '30px' }}>
              <div className="result-card">
                <h3>Current Weather - {weather.city}</h3>
                <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div>
                    <strong>Temperature:</strong> {weather.current.temperature}°C
                  </div>
                  <div>
                    <strong>Humidity:</strong> {weather.current.humidity}%
                  </div>
                  <div>
                    <strong>Wind Speed:</strong> {weather.current.wind_speed} km/h
                  </div>
                  <div>
                    <strong>Precipitation:</strong> {weather.current.precipitation} mm
                  </div>
                </div>
              </div>

              <div className="result-card">
                <h3>Today's Forecast</h3>
                <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div>
                    <strong>Max Temp:</strong> {weather.forecast.max_temp}°C
                  </div>
                  <div>
                    <strong>Min Temp:</strong> {weather.forecast.min_temp}°C
                  </div>
                  <div>
                    <strong>Precipitation:</strong> {weather.forecast.precipitation} mm
                  </div>
                </div>
              </div>

              <div className="result-card">
                <h3>Farming Advisory</h3>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {weather.advisory.map((advice, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {advice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
