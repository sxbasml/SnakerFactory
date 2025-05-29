// src/redux/actions/productoActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerProductos } from '../../Services/productoService';

export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async (nombre = '') => {
    const response = await obtenerProductos(nombre);
    return response;
  }
);
