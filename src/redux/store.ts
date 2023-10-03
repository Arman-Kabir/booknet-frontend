import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import listSlice from './features/wishlist/listSlice';
import readingSlice from './features/reading/readingSlice';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import bookSlice from './features/books/bookSlice';

const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    list: listSlice,
    reading: readingSlice,
    book:bookSlice,
    [api.reducerPath]: api.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
        
    // {
    //     // list: listSlice,
    //     // reading: readingSlice,
    //    // [api.reducerPath]: api.reducer
    // },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);

export { store, persistor };