import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, pending, rejected, fulfilled } from "../../utils/constants";
import axios from "axios";

const initialState = {
    lessonsDashboard: [],
    lessonDashboard: {},
    status: "idle",
    error: null,
};

const fetchAllLessonsDashboard = createAsyncThunk(
    "lessons/fetchAllLessonsDashboard",
    async () => {
        try {
            const response = await axios.get(`${URL}/lessons/all`);
            return response.data;
        } catch (error) {
            throw new Error(error.response);
        }
    }
);

const lessonsDashSlice = createSlice({
    name: "lessonsDash",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessonsDashboard.pending, (state, action) => {
                state.status = pending;
                state.error = null;
            })
            .addCase(fetchAllLessonsDashboard.fulfilled, (state, action) => {
                state.status = fulfilled;
                state.lessonsDashboard = action.payload;
                state.error = null;
            }
            )
            .addCase(fetchAllLessonsDashboard.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.payload;
            }
            );
    },
});

export const selectAllLessonsDashboard = (state) => state.lessonsDashboard.lessonsDashboard;
export const selectStatus = (state) => state.lessonsDashboard.status;
export const selectError = (state) => state.lessonsDashboard.error;

export default lessonsDashSlice.reducer;
export { fetchAllLessonsDashboard };