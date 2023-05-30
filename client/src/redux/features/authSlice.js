import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../utils/constants";
import { pending, fulfilled, rejected } from "../../utils/constants";
import axios from "axios";


const fetchUserAuth = createAsyncThunk(
    'auth/fetchUser',async (id) => {
        try {
            const response = await axios.get(`${URL}/users/${id}`)
            return response.data
        }
        catch (error) {
            throw new Error(error.response)
        }
    }
)


const initialState = {
    isActive: false,
    isAdmin: false,
    error: null,
    status: 'idle'
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setIsActive: (state, action) => {
            state.isActive = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAuth.fulfilled, (state, action) => {
                state.isActive = action.payload.user.membresia?.status;
                state.error = null;
                state.status = fulfilled;

            })
            .addCase(fetchUserAuth.rejected, (state, action) => {
                state.error = action.payload;
                state.status = rejected;
            })
            .addCase(fetchUserAuth.pending, (state, action) => {
                state.status = pending;
                state.error = null;
            })

    }
})

export const selectIsActive = (state) => state.auth.isActive;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectError = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer;
export const {setIsActive, setIsAdmin} = authSlice.actions;
export {fetchUserAuth};