import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL, pending, rejected, fulfilled } from "../../utils/constants";
import { sortAtoZ,sortZtoA, sortEasiestToHardest, sortHardestToEasiest } from "../../utils/sorterUtils";
import { cleaner } from "../../utils/cleanerUtils";
import  axios  from 'axios';



const fetchAllLessons = createAsyncThunk(
    'lessons/fetchAllLessons', async () => {
        
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
            const response = await axios.get(`${URL}${PORT}/lessons/${id}`);
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
        orderFromAtoZ: (state) => {
            state.lessons = sortAtoZ(state.lessons);
        },
        orderFromZtoA: (state) => {
            state.lessons = sortZtoA(state.lessons);
        },
        orderFomHardestToEasiest: (state) => {
            state.lessons = sortHardestToEasiest(state.lessons);
        },
        orderFromEasiestToHardest: (state) => {
            state.lessons = sortEasiestToHardest(state.lessons);
        },
        sortByType: (state,action) => {
            const typesArray = action.payload;
            const lessons = state.lessons;
            const filteredLessons = lessons.filter((lesson) => {
                const lessonTypes = lesson.exercisesTypes;
                return typesArray.every((type) => lessonTypes.includes(type))});

            state.lessons = filteredLessons;
            if (filteredLessons.lenght === 0) state.error = 'No se encontraron lecciones con los filtros seleccionados';
            if (filteredLessons.lenght > 0) state.error = '';
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessons.fulfilled, (state, {payload}) => {
                const cleanedData = cleaner(payload);
                state.error = '';
                state.status = fulfilled;
                state.lessons = cleanedData;
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
            .addCase(fetchLessonsByID.fulfilled, (state, {payload}) => {
                state.lesson = {payload};
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
export const { orderFromAtoZ, orderFromZtoA, orderFomHardestToEasiest, orderFromEasiestToHardest, sortByType } = lessonsSlice.actions;
export { fetchAllLessons, fetchLessonsByID }