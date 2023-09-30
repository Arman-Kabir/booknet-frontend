import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import listSlice from './features/wishlist/listSlice';
import readingSlice from './features/reading/readingSlice';

const store = configureStore({
    reducer: {
        list: listSlice,
        reading: readingSlice,
        [api.reducerPath]: api.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;