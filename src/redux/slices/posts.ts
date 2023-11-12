import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initial_state';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        ...initialState,
        isAuthenticated: true,
        user: {
            posts: [],
        } as UserData,
    },
    reducers: {
        addPost(state, action) {
            if (state && state.user && state.user.posts?.length) {
                state.user.posts.push(action.payload);
            } else {
                state.user.posts = [action.payload];
            }
        },
    },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
