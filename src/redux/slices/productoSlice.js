// src/redux/slices/productoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductos } from '../actions/productoActions';

const productoSlice = createSlice({
  name: 'productos',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProductos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productoSlice.reducer;
