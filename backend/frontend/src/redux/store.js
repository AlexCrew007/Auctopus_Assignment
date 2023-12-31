import { configureStore } from '@reduxjs/toolkit'
import  LoginSlice  from './slices/LoginSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './services/api';

export const store = configureStore({
    reducer:{
        login : LoginSlice,
        [api.reducerPath] : api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)
export default store

