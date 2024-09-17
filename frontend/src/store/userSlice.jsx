import { createSlice } from '@reduxjs/toolkit'

// Initial state setup
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null, // Local storage se user ko load karo
    userProfile: null,
    suggestedUsers: [],
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('user'), // Authenticated state based on local storage
    isCheckingAuth: true, // App startup pe auth check ho raha hoga
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action) => {
            state.user = action.payload;
            if (state.user.isVerified) {
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Local storage me user ko save karo
            }
        },
        verifyOTP: (state, action) => {
            state.user = action.payload;
            if (state.user) {
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Local storage me user ko save karo
            }
        },
        checkUserAuth: (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Local storage me user ko save karo
            } else {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('user'); // User nahi hai, to local storage se delete karo
            }
            state.isCheckingAuth = false; // Auth check khatam ho gaya
        },
        passwordReset: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Password reset ke baad user ko update karo
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); // Logout pe local storage se user hata do
        },
        getUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        getSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        editUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Edit ke baad user update karo
        },
    },
})

// Export the actions
export const {
    signup,
    verifyOTP,
    checkUserAuth,
    passwordReset,
    logout,
    getUserProfile,
    getSuggestedUsers,
    editUser,
} = userSlice.actions;

export default userSlice.reducer;
