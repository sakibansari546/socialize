import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        verifyOTP: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        checkUserAuth: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }
    },
})


export const { signup, verifyOTP, checkUserAuth } = userSlice.actions

export default userSlice.reducer