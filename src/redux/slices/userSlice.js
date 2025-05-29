import { createSlice } from '@reduxjs/toolkit';
import { loginUsuario, registerUsuario } from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem('user');
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUsuario.fulfilled, (state, action) => action.payload)
      .addCase(registerUsuario.fulfilled, (state, action) => action.payload);
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
