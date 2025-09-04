import axios from 'axios';

// Use the environment variable for the base URL, with a fallback for local development
const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001') + '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;