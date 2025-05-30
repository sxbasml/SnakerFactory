// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishReducer from './slices/wishSlice';
import userReducer from './slices/userSlice';
import productoReducer from './slices/productoSlice';

export const store = configureStore({
  reducer: {
    productos: productoReducer,
    cart: cartReducer,
    wish: wishReducer,
    user: userReducer,
  },
});
