import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../api';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    location: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      setError('Please enter phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.sendOTP({ phone: formData.phone });
      setOtpSent(true);
      setSuccess(`OTP sent! (Demo OTP: ${response.data.otp})`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.verifyOTP({ phone: formData.phone, otp });
      const response = await authAPI.register(formData);
      onLogin(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🌾 Farmer Advisory System</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>Register</h3>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleSendOTP}
                className="btn btn-secondary"
                disabled={loading || otpSent}
              >
                {otpSent ? 'Sent' : 'Send OTP'}
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-group">
            <label>Location (Optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading || !otpSent}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
