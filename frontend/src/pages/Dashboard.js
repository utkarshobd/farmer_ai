import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const features = [
    { title: '🌱 Crop Recommendation', desc: 'Get AI-powered crop suggestions', link: '/crop-recommendation' },
    { title: '🌤️ Weather Advisory', desc: 'Real-time weather updates', link: '/weather' },
    { title: '🦠 Disease Detection', desc: 'Detect plant diseases from images', link: '/disease-detection' },
    { title: '💰 Market Prices', desc: 'Current and predicted crop prices', link: '/market-prices' },
    { title: '💬 AI Chatbot', desc: 'Get instant farming advice', link: '/chatbot' },
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>🌾 Farmer Advisory System</h2>
        <div className="nav-links">
          <span>Welcome, {user?.name}!</span>
          <button onClick={onLogout} className="btn btn-logout">Logout</button>
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <h1>Dashboard</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Access all farming advisory features from here
          </p>
        </div>

        <div className="grid">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} style={{ textDecoration: 'none' }}>
              <div className="feature-card">
                <h3>{feature.title}</h3>
                <p style={{ color: '#666' }}>{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
