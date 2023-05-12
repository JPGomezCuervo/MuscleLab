import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL, pending, rejected, fulfilled } from "../../utils/constants";
import lessons from "../../utils/lessons";
import  axios  from 'axios';



const fetchAllLessons = createAsyncThunk(
    'lessons/fetchAllLessons', async () => {
        console.log('entre');
        try {
            const response = await axios.get(`${URL}${PORT}/lessons`);

            return response.data
        } catch (error){
            throw new Error (error.response) 
        }

    }
)
const fetchLessonsByID = createAsyncThunk(
    'lessons/fetchAllLessonsByID', async (id) => {
        try {
            const response = await axios.get(`${URL}${PORT}/lessons/:id`);
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
            .addCase(fetchAllLessons.fulfilled, (state, action) => {
                state.error = '';
                state.status = fulfilled;
                state.lessons = action.payload;
            }
            )
            .addCase(fetchAllLessons.pending, (state, action) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllLessons.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error;
            })
            .addCase(fetchLessonsByID.fulfilled, (state, action) => {
                state.lesson = action.payload;
                state.error = '';
                state.status = fulfilled;
            })
            .addCase(fetchLessonsByID.pending, (state, action) => {
                state.status = pending;
                state.error = '' 
            })
            .addCase (fetchLessonsByID.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error
            })
    }
})


export const selectAllLessons = (state) => state.lessons.lessons;
export const selectLesson = (state) => state.lessons.lesson;
export const selectStatus = (state) => state.lessons.status;
export const selectError = (state) => state.lessons.error;
export default lessonsSlice.reducer;
export { fetchAllLessons, fetchLessonsByID }