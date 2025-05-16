import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthService";
import { registerAPI } from "../services/RegisterService";

const rootReducer = combineReducers({
    // userReducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(registerAPI.middleware, authAPI.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;