import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cropAPI } from '../api';

function CropRecommendation({ user, onLogout }) {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
    humidity: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await cropAPI.recommend(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
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
          <h1>🌱 Crop Recommendation</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Enter your soil and environmental data to get crop recommendations
          </p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <div className="grid">
              <div className="form-group">
                <label>Nitrogen (N) - kg/ha</label>
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phosphorus (P) - kg/ha</label>
                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="e.g., 40"
                  required
                />
              </div>

              <div className="form-group">
                <label>Potassium (K) - kg/ha</label>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="e.g., 40"
                  required
                />
              </div>

              <div className="form-group">
                <label>pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="e.g., 6.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Rainfall - mm</label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  required
                />
              </div>

              <div className="form-group">
                <label>Temperature - °C</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  required
                />
              </div>

              <div className="form-group">
                <label>Humidity - %</label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="e.g., 70"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Analyzing...' : 'Get Recommendation'}
            </button>
          </form>

          {result && (
            <div style={{ marginTop: '30px' }}>
              <div className="result-card">
                <h3>Recommended Crop: {result.recommended_crop.toUpperCase()}</h3>
                <p style={{ marginTop: '10px' }}>
                  This crop is best suited for your soil and environmental conditions.
                </p>
              </div>

              <div className="result-card">
                <h3>Top 3 Recommendations</h3>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {result.top_recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      {rec.crop.toUpperCase()} (Score: {rec.score})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="result-card">
                <h3>Fertilizer Suggestions</h3>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {result.fertilizer_suggestion.map((suggestion, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      {suggestion}
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

export default CropRecommendation;
