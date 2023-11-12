import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initial_state';

const profileSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserName(state, action) {
            if (state.user) {
                state.user.username = action.payload;
            }
        },
    },
});

export const { updateUserName } = profileSlice.actions;

export default profileSlice.reducer;
