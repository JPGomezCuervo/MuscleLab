import { configureStore } from '@reduxjs/toolkit';
import { cacheMiddleware } from './features/lessonsSlice';
import lessonsReducer from './features/lessonsSlice';
import utilsReducer from './features/utilsSlice';
import usersReducer from './features/usersSlice';
import typesReducer from './features/typesSlice';
import filtersReducer from './features/filtersSlice';
import authReducer from './features/authSlice';
import officesReducer from './features/officesSlice';
import membershipsReducer from './features/membershipsSlice';
import goalsReducer from './features/goalsSlice';
import lessonsDashboardReducer from './features/lessonsDashSlice';
import officesDashboardReducer from './features/officesDashSlice';
import { cacheMiddlewareOffices } from './features/officesSlice';

const store = configureStore({
    reducer: {
        lessons: lessonsReducer,
        types: typesReducer,
        goals: goalsReducer,
        users: usersReducer,
        utils: utilsReducer,
        filters: filtersReducer,
        auth: authReducer,
        offices: officesReducer,
        memberships: membershipsReducer,
        lessonsDashboard: lessonsDashboardReducer,
        officesDashboard: officesDashboardReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheMiddleware),
    // .concat(cacheMiddlewareOffices),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store