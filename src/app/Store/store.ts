import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthService";
import { registerAPI } from "../services/RegisterService";
import { connectWsApi } from "../services/ConnectWs";
import { chatApi } from "../services/ChatServise";

const rootReducer = combineReducers({
    // userReducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [connectWsApi.reducerPath]: connectWsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(registerAPI.middleware, authAPI.middleware, connectWsApi.middleware, chatApi.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;