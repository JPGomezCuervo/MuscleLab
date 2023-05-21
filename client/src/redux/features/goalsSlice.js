import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, pending, rejected, fulfilled } from "../../utils/constants";
import { goalsCleaner } from "../../utils/cleanerUtils";
import axios from 'axios';

const fetchAllLessonGoals = createAsyncThunk(
    'goals/fetchAllLessonGoals', async () => {
        try {
            const response = await axios.get(`${URL}/goals`);
            return response.data
        } catch (error) {
            throw new Error(error.response)
        }

    }
)
const initialState = {
    goals: [],
    status: 'idle',
    error: ''
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        // aquí van las otras acciones
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessonGoals.fulfilled, (state, {payload}) => {
                const cleanedData = goalsCleaner(payload);
                state.error = '';
                state.status = fulfilled;
                state.goals = cleanedData;
            }
            )
            .addCase(fetchAllLessonGoals.pending, (state, {payload}) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllLessonGoals.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.error;
            })
    }
})

export const selectAllLessonGoals = (state) => state.goals.goals;
export { fetchAllLessonGoals };
export default goalsSlice.reducer;
