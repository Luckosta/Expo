import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initial_state';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser(state, action) {
            state.user = action.payload;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<UserData>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },

        setError(state, action) {
            state.error = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        exit(state, action) {
            state.isAuthenticated = false;
            state.user = action.payload;
            state.error = null;
        },
    },
});

export const { registerUser, setError, loginSuccess, loginFailure, exit } =
    authSlice.actions;

export default authSlice.reducer;
