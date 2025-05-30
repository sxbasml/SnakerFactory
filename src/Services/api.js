// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44324/api', 
});

export default api;
