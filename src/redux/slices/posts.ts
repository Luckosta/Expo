import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initial_state';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        ...initialState,
        user: {
            posts: [],
        } as UserData,
    },
    reducers: {
        addPost(state, action: PayloadAction<UserPost>) {
            if (state && state.user && state.user.posts?.length) {
                state.user.posts.push(action.payload);
            } else {
                state.user.posts = [action.payload];
            }
        },

        updatePost(state, action: PayloadAction<UserPost>) {
            if (state && state.user && state.user.posts?.length) {
                const index = state.user.posts.findIndex(
                    (post) => post.id === action.payload.id,
                );

                if (index !== -1) {
                    state.user.posts[index] = action.payload;
                }
            }
        },
    },
});

export const { addPost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
