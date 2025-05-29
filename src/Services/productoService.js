//Aqui deben ir los metodos que llaman a productos

// src/services/productoService.js
import api from './api'; // IMPORTACIÓN EN MINÚSCULAS

export const obtenerProductos = async (nombre = '') => {
  const respuesta = await api.get(`/productos?nombre=${nombre}`);
  return respuesta.data;
};
