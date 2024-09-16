import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPosts: (state, action) => {
            state.posts = action.payload
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
    },
})

export const { fetchPosts, addPost } = postSlice.actions

export default postSlice.reducer
