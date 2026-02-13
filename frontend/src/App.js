import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import Weather from './pages/Weather';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketPrices from './pages/MarketPrices';
import Chatbot from './pages/Chatbot';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!token ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={token ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/crop-recommendation" element={token ? <CropRecommendation user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/weather" element={token ? <Weather user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/disease-detection" element={token ? <DiseaseDetection user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/market-prices" element={token ? <MarketPrices user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/chatbot" element={token ? <Chatbot user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
