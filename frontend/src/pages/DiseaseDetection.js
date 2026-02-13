import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { diseaseAPI } from '../api';

function DiseaseDetection({ user, onLogout }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await diseaseAPI.detect(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to detect disease');
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
          <h1>🦠 Plant Disease Detection</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Upload an image of the affected plant to detect diseases
          </p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <div className="form-group">
              <label>Upload Plant Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {preview && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '400px', maxHeight: '400px', borderRadius: '10px' }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '20px' }}>
              {loading ? 'Analyzing...' : 'Detect Disease'}
            </button>
          </form>

          {result && (
            <div style={{ marginTop: '30px' }}>
              <div className="result-card">
                <h3>Detection Result</h3>
                <div style={{ marginTop: '15px' }}>
                  <p><strong>Disease:</strong> {result.disease.replace('_', ' ').toUpperCase()}</p>
                  <p style={{ marginTop: '10px' }}><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="result-card">
                <h3>Description</h3>
                <p style={{ marginTop: '10px' }}>{result.description}</p>
              </div>

              <div className="result-card">
                <h3>Treatment Recommendation</h3>
                <p style={{ marginTop: '10px' }}>{result.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;
