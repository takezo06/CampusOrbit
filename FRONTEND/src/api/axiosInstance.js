import axios from 'axios';

const api = axios.create({
  // Point to your local PHP server
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// This will be used later to attach the token for pings
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('orbit_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;