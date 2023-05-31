import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {URL, pending, rejected, fulfilled } from "../../utils/constants";
import axios from "axios";
import { branchOfficeCleaner } from "../../utils/cleanerUtils";

const fetchAllOfficesDashboard = createAsyncThunk(
    'officesDash/fetchAllOfficesDashboard', async () => {
        try {
            const response = await axios.get(`${URL}/branchoffice`);
            return response.data
        } catch (error){
            console.log(error.response.data);
            throw new Error (error.response)
        }
    }
);

const fetchOfficeByIDDashboard = createAsyncThunk(
    'officesDash/fetchOfficeByIDDashboard', async (id) => {
        try {
            const response = await axios.get(`${URL}/branchoffice/${id}`);
            return response.data
        } catch (error){
            throw new Error (error.response)
        }
    }
);

const initialState = {
    officesDashboard: [],
    officeDashboard: {},
    status: 'idle',
    error: ''
};

const officesDashSlice = createSlice({
    name: 'officesDash',
    initialState,
    reducers: {
        // aquí van las otras acciones
        clearOfficeDashboard: (state, {payload}) =>{
            state.officesDashboard = state.officesDashboard.filter((office)=>{
                
                return office.id !== payload
            })
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllOfficesDashboard.fulfilled, (state, action) => {
                const cleanedData = branchOfficeCleaner(action.payload);
                state.error = '';
                state.status = fulfilled;
                state.officesDashboard = cleanedData;
            })

            .addCase(fetchAllOfficesDashboard.pending, (state) => {
                state.status = pending;
                state.error = '';
            })

            .addCase(fetchAllOfficesDashboard.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.payload;
            })

        }
});


export const selectAllOffices = (state) => state.officesDashboard.officesDashboard;
export const selectOfficeByID = (state) => state.officesDashboard.officeDashboard;
export const selectStatus = (state) => state.officesDashboard.status;
export const selectError = (state) => state.officesDashboard.error;

export { fetchAllOfficesDashboard, fetchOfficeByIDDashboard };
export const { clearOfficeDashboard } = officesDashSlice.actions;
export default officesDashSlice.reducer;



