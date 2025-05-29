// src/redux/slices/wishSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { wishService } from '../../Services/productoService';

const initialState = wishService.list();

const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    toggleWish: (state, action) => wishService.toggle(action.payload),
  },
});

export const { toggleWish } = wishSlice.actions;
export default wishSlice.reducer;
