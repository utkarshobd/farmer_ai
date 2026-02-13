import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { chatAPI } from '../api';

function Chatbot({ user, onLogout }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I am your farming assistant. Ask me about weather, crops, diseases, prices, or any farming advice.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.send({ query: input });
      const botMessage = { type: 'bot', text: response.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { type: 'bot', text: 'Sorry, I could not process your request. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
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
          <h1>💬 AI Chatbot</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Ask me anything about farming, crops, weather, or market prices
          </p>

          <div className="chat-container" style={{ marginTop: '30px' }}>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="message bot">
                  Typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={loading}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                Send
              </button>
            </form>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
            <strong>Quick Questions:</strong>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['How to check weather?', 'Tell me about crop recommendation', 'How to detect diseases?', 'Market prices info'].map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="btn btn-secondary"
                  style={{ fontSize: '14px', padding: '8px 15px' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
