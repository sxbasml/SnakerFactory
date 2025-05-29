// src/redux/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../Services/userService';

export const loginUsuario = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    const res = userService.login(username, password);
    if (res.ok) return userService.current();
    return rejectWithValue(res.msg);
  }
);

export const registerUsuario = createAsyncThunk(
  'user/register',
  async ({ username, password }, { rejectWithValue }) => {
    const res = userService.register(username, password);
    if (res.ok) return userService.current();
    return rejectWithValue(res.msg);
  }
);
