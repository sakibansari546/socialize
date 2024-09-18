import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    hasMore: true // To track if more posts are available
}

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
        }
    },
})

export const { fetchPosts, addPost, likeOrNot, postSavedOrNot } = postSlice.actions

export default postSlice.reducer
