// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { api } from './api/apiSlice';
// import listSlice from './features/wishlist/listSlice';
// import readingSlice from './features/reading/readingSlice';

// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
// import bookSlice from './features/books/bookSlice';

// const persistConfig = {
//     key: 'root',
//     storage,
// };
// const rootReducer = combineReducers({
//     list: listSlice,
//     reading: readingSlice,
//     book:bookSlice,
//     [api.reducerPath]: api.reducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//     reducer: persistedReducer,
        
//     // {
//     //     // list: listSlice,
//     //     // reading: readingSlice,
//     //    // [api.reducerPath]: api.reducer
//     // },

//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(api.middleware),
    
// });


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import listSlice from './features/wishlist/listSlice';
import readingSlice from './features/reading/readingSlice';
import bookSlice from './features/books/bookSlice';

const rootReducer = combineReducers({
    list: listSlice,
    reading: readingSlice,
    book: bookSlice,
    [api.reducerPath]: api.reducer
});

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    // Save the relevant state to local storage
    const stateToPersist = {
        list: store.getState().list,
        reading: store.getState().reading,
        book: store.getState().book
    };

    localStorage.setItem('reduxState', JSON.stringify(stateToPersist));

    return result;
};

// Load the state from local storage when initializing the store
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
