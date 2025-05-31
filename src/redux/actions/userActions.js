// src/redux/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../Services/userService';

export const loginUsuario = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await userService.login(username, password);
      if (res.ok) return userService.current();
      return rejectWithValue(res.msg || 'Credenciales incorrectas');
    } catch (e) {
      return rejectWithValue('Error al iniciar sesión');
    }
  }
);

export const registerUsuario = createAsyncThunk(
  'user/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await userService.register(username, password);
      if (res.ok) return userService.current();
      return rejectWithValue(res.msg || 'Registro fallido');
    } catch (e) {
      return rejectWithValue('Error al registrar usuario');
    }
  }
);

