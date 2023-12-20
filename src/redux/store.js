import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './tree/userslice.js';
import { persistReducer } from 'redux-persist';
const rootreducer = combineReducers({ avl: userReducer });
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';
const persistConfig = {
    key: 'root',
    storage,
    version:1,
}
const persistedReducer =persistReducer(persistConfig,rootreducer)
export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ serializableCheck: false, })
            
        ,
}
)

export const persistor=persistStore(store)