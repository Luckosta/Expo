// src/redux/reducers/authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {
	loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
