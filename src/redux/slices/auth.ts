import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initial_state';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //loginUser(state, action) {
        //    const { login, password } = action.payload;

        //    const isValidCredentials = checkCredentials({ login, password });

        //    if (isValidCredentials) {
        //        state.user = action.payload;
        //        state.error = null;
        //    } else {
        //        state.user = null;
        //        state.error = 'Неверные учетные данные';
        //    }
        //},

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
});

export const { registerUser, setError, loginSuccess, loginFailure } =
    authSlice.actions;

export default authSlice.reducer;
