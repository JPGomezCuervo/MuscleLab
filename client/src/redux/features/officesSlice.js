import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {URL, pending, rejected, fulfilled } from "../../utils/constants";
import axios from "axios";
import { branchOfficeCleaner } from "../../utils/cleanerUtils";

const fetchAllOffices = createAsyncThunk(
    'offices/fetchAllOffices', async () => {
        try {
            const response = await axios.get(`${URL}/branchoffice`);
            return response.data
        } catch (error){
            throw new Error (error.response)
        }
    }
);

const fetchOfficeByID = createAsyncThunk(
    'offices/fetchOfficeByID', async (id) => {
        try {
            const response = await axios.get(`${URL}/branchoffice/${id}`);
            return response.data
        } catch (error){
            throw new Error (error.response)
        }
    }
);

export const cacheMiddlewareOffices = (store) => (next) => (action) => { 
    if (
        action.type === fetchAllOffices.fulfilled.type &&
        store.getState().offices.offices.length > 0
    ) {
        return Promise.resolve();
    }
    return next(action);
};

const initialState = {
    offices: [],
    office: {},
    status: 'idle',
    error: ''
};

const officesSlice = createSlice({
    name: 'offices',
    initialState,
    reducers: {
        // aquí van las otras acciones
        clearOffice: (state, {payload}) =>{
            state.offices = state.offices.filter((office)=>{
                
                return office.id !== payload
            })
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllOffices.fulfilled, (state, action) => {
                const cleanedData = branchOfficeCleaner(action.payload);
                state.error = '';
                state.status = fulfilled;
                state.offices = cleanedData;
            })
            .addCase(fetchAllOffices.pending, (state) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllOffices.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.error.message;
            })
            .addCase(fetchOfficeByID.fulfilled, (state, {payload}) => {
                state.error = '';
                state.status = fulfilled;
                state.office = payload;
            })
            .addCase(fetchOfficeByID.pending, (state) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchOfficeByID.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.error.message;
            })
    }
});


export const selectAllOffices = (state) => state.offices.offices;
export const selectOffice = (state) => state.offices.office;
export const selectStatus = (state) => state.offices.status;
export const selectError = (state) => state.offices.error;

export default officesSlice.reducer;
export const {clearOffice} = officesSlice.actions;
export { fetchAllOffices, fetchOfficeByID };


