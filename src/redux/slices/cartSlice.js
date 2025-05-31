// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { cartService } from '../../Services/productoService';

const initialState = [...cartService.list()]; // Clonamos el array para evitar que esté "congelado"

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      cartService.add(action.payload);
      const updated = cartService.list();
      state.splice(0, state.length, ...updated); // Mutación segura
    },
    removeFromCart: (state, action) => {
      cartService.remove(action.payload);
      const updated = cartService.list();
      state.splice(0, state.length, ...updated);
    },
    clearCart: (state) => {
      cartService.clear();
      state.splice(0, state.length); // Vacía el array
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
