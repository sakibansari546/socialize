import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
})

export const { } = postSlice.actions

export default postSlice.reducer
