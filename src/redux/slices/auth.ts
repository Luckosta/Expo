import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import registerUserAsync from '../actions/register';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action) {
            state.user = action.payload;
            state.error = null;
        },
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message || null;
            });
    },
});

export const { loginUser, registerUser, setError, loginSuccess, loginFailure } =
    authSlice.actions;

export default authSlice.reducer;
