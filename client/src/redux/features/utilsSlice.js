import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'Light'
}


const utilsSlice = createSlice ({
    name: 'utils',
    initialState,
    reducers: {
        darkMode: (state) => {
            state.mode = 'Dark'
        },
        lightMode: (state) => {
            state.mode = 'Light'
        }
    }
})

export const selectMode = (state) => state.mode;

export default utilsSlice.reducer;
export const {darkMode, lightMode} = utilsSlice.actions;