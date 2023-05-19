import { configureStore } from '@reduxjs/toolkit';
import { cacheMiddleware } from './features/lessonsSlice';
import lessonsReducer from './features/lessonsSlice';
import utilsReducer from './features/utilsSlice';
import usersReducer from './features/usersSlice';
import typesReducer from './features/typesSlice';
import filtersReducer from './features/filtersSlice';
import authReducer from './features/authSlice';
import officesReducer from './features/officesSlice';
import membershipsReducer from './features/membershipsSlice'

const store = configureStore({
    reducer: {
        lessons: lessonsReducer,
        types: typesReducer,
        users: usersReducer,
        utils: utilsReducer,
        filters: filtersReducer,
        auth: authReducer,
        offices: officesReducer,
        memberships: membershipsReducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store