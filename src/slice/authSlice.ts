import { createSlice } from '@reduxjs/toolkit';
const token = localStorage.getItem('token');
const initialState = token ? JSON.parse(token) : {
  tokenType: null,
  accessToken: null,
  expiresIn: null,
  refreshToken: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { tokenType, accessToken, expiresIn, refreshToken } = action.payload;
      state.tokenType = tokenType;
      state.accessToken = accessToken;
      state.expiresIn = expiresIn;
      state.refreshToken = refreshToken;
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.tokenType = null;
      state.accessToken = null;
      state.expiresIn = null;
      state.refreshToken = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
