import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  sendOTP: (data) => api.post('/send-otp', data),
  verifyOTP: (data) => api.post('/verify-otp', data),
};

export const cropAPI = {
  recommend: (data) => api.post('/crop-recommendation', data),
};

export const weatherAPI = {
  get: (city) => api.get(`/weather?city=${city}`),
};

export const diseaseAPI = {
  detect: (formData) => api.post('/disease-detection', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const marketAPI = {
  getPrices: (crop) => api.get(`/market-prices${crop ? `?crop=${crop}` : ''}`),
};

export const chatAPI = {
  send: (data) => api.post('/chatbot', data),
};

export default api;
