import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import listSlice from './features/wishlist/listSlice';

const store = configureStore({
    reducer: {
        list:listSlice,
        [api.reducerPath]: api.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;