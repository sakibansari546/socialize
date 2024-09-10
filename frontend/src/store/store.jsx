import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

// Persist Config
const persistConfig = {
    key: 'root',
    storage,
}

// Create a persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer)

// Create Store
export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
    // Middleware configuration
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

// Create the persistor
export const persistor = persistStore(store)
