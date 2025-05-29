// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44324', // Ajusta el puerto si es necesario
});

export default api;
