import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, pending, rejected, fulfilled } from "../../utils/constants";
import axios from "axios";

const fetchAllMemberships = createAsyncThunk(
    'memberships/fetchAllMemberships', async () => {
        try {
            const response = await axios.get(`${URL}/memberships`);
            return response.data
        } catch (error) {
            throw new Error(error.response)
        }
    }
    )
    
const initialState = {
   memberships: [],
   status: 'idle',
    error: ''
 };

 const membershipsSlice = createSlice({
        name: 'memberships',
        initialState,
        reducers: {
            // aquí van las otras acciones
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllMemberships.pending, (state) => {
                    state.status = pending;
                    state.error = '';
                })
                .addCase(fetchAllMemberships.fulfilled, (state, action) => {
                    state.status = fulfilled;
                    state.memberships = action.payload;
                    state.error = '';
                })
                .addCase(fetchAllMemberships.rejected, (state, action) => {
                    state.status = rejected;
                    state.error = action.payload;
                })
        }
    })

export const selectAllMemberships = (state) => state.memberships.memberships;

export default membershipsSlice.reducer;
export { fetchAllMemberships }




