import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashAuth: true
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setDashAuth: (state, {payload}) => {
            state.dashAuth = payload;
        }
    }
})

export const selectDashAuth = (state) => state.auth.dashAuth;

export default authSlice.reducer;
export const {setDashAuth} = authSlice.actions;