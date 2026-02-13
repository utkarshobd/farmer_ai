import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { marketAPI } from '../api';

function MarketPrices({ user, onLogout }) {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await marketAPI.getPrices();
      setPrices(response.data.prices);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch market prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return '#2ed573';
    if (trend === 'down') return '#ff4757';
    return '#ffa502';
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
          <h1>💰 Market Prices</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Current market prices and predictions for major crops
          </p>

          {error && <div className="error">{error}</div>}

          {loading && <div className="loading">Loading market data...</div>}

          {prices && (
            <div className="grid" style={{ marginTop: '30px' }}>
              {Object.entries(prices).map(([crop, data]) => (
                <div key={crop} className="result-card">
                  <h3 style={{ textTransform: 'capitalize', marginBottom: '15px' }}>
                    {crop}
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Current Price:</strong> ₹{data.current}/quintal
                    </div>
                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <strong>Trend:</strong>
                      <span style={{ color: getTrendColor(data.trend) }}>
                        {getTrendIcon(data.trend)} {data.trend.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Predicted Price:</strong> ₹{data.prediction}/quintal
                    </div>
                    <div style={{ 
                      marginTop: '15px', 
                      padding: '10px', 
                      background: getTrendColor(data.trend) + '20',
                      borderRadius: '5px',
                      textAlign: 'center'
                    }}>
                      {data.trend === 'up' && '✅ Good time to sell'}
                      {data.trend === 'down' && '⚠️ Consider holding'}
                      {data.trend === 'stable' && 'ℹ️ Stable market'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketPrices;
