import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signup: (state, action) => {
            state.user = action.payload;
        },
        verifyOTP: (state, action) => {
            state.user = action.payload;
        }
    },
})


export const { signup, verifyOTP } = userSlice.actions

export default userSlice.reducer