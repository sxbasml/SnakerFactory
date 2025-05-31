// src/redux/slices/wishSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { wishService } from '../../Services/productoService';

const initialState = [...wishService.list()]; // Clonamos para evitar objetos congelados

const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    toggleWish: (state, action) => {
      wishService.toggle(action.payload);
      const updated = wishService.list();
      state.splice(0, state.length, ...updated); // Mutación segura del estado
    },
  },
});

export const { toggleWish } = wishSlice.actions;
export default wishSlice.reducer;

