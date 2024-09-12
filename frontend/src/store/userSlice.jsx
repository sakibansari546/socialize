import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth: true, // Starts as true to indicate the app is checking auth
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action) => {
            state.user = action.payload;
            if (state.user.isVerified) state.isAuthenticated = true;
        },
        verifyOTP: (state, action) => {
            state.user = action.payload;
            if (state.user) state.isAuthenticated = true;
        },
        checkUserAuth: (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.isAuthenticated = false;
            }
            state.isCheckingAuth = false; // Auth check completed
        },
        passwordReset: (state, action) => {
            state.user = action.payload;
        },
    },
})

export const { signup, verifyOTP, checkUserAuth, passwordReset } = userSlice.actions

export default userSlice.reducer
