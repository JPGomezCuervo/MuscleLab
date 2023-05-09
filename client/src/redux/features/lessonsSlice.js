import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL } from "../../utils/constants";
import  axios  from 'axios';



const fetchLessons = createAsyncThunk(
    'lessons/fetchLessons', async () => {
        try {
            const response = await axios.get(`${URL}+${PORT}/lessons`);
            return response.data
        } catch (error){
            // revisar como el back envia los errores
            throw new Error (error.response) 
        }

    }
)
const fetchLesonsByID = createAsyncThunk(
    'lessons/fetchLessonsByID', async () => {
        try {
            const response = await axios.get(`${URL}+${PORT}/lessons/:id`);
            return response.data
        } catch (error){
            // revisar como el back envia los errores
            throw new Error (error.response) 
        }

    }
)


const initialState = {
    lessons: [],
    lesson: {},
    status: 'idle',
    error: ''
}

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        // aquí van las otras acciones
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.error = '';
                state.status = 'succeeded';
                state.lessons = state.lessons.push(action.payload);
            }
            )
            .addCase(fetchLessons.pending, (state, action) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.status = 'failed';
                //revisar sintaxis del error
                state.error = action.error;
            })
            .addCase(fetchLesonsByID.fulfilled, (state, action) => {
                state.lesson = action.payload;
                state.error = '';
                state.status = 'succeeded';
            })
            .addCase(fetchLesonsByID.pending, (state, action) => {
                state.status = 'loading';
                state.error = '' 
            })
            .addCase (fetchLesonsByID.rejected, (state, action) => {
                state.status = 'failed';
                //revisar sintaxis del error
                state.error = action.error
            })
    }
})


export const selectAllLessons = (state) => state.lessons;
export const selectStatus = (state) => state.status;
export const selectError = (state) => state.error;
export default lessonsSlice.reducer;
export { fetchLessons, fetchLesonsByID }