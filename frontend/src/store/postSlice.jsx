import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    trandingPosts: [],
    hasMore: true // To track if more posts are available
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPosts: (state, action) => {
            if (action.payload.length === 0) {
                state.hasMore = false; // No more posts to load
            } else {
                state.posts = [...state.posts, ...action.payload]; // Append new posts
            }
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        likeOrNot: (state, action) => {
            state.posts = action.payload;
        },
        postSavedOrNot: (state, action) => {
            state.posts = action.payload;
        },
        getTrandingPosts: (state, action) => {
            if (action.payload.length === 0) {
                state.hasMore = false; // No more trending posts to load
            } else {
                state.trandingPosts = [...state.trandingPosts, ...action.payload]; // Append new trending posts
            }
        },
        updateTrandingPosts: (state, action) => {
            state.trandingPosts = action.payload;
        }
    },
});

export const { fetchPosts, addPost, likeOrNot, postSavedOrNot, getTrandingPosts, updateTrandingPosts } = postSlice.actions;

export default postSlice.reducer;
