// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { cartService } from '../../Services/productoService';

const initialState = cartService.list();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => cartService.add(action.payload),
    removeFromCart: (state, action) => cartService.remove(action.payload),
    clearCart: () => cartService.clear(),
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
