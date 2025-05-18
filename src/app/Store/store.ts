import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthService";
import { registerAPI } from "../services/RegisterService";
import { messageApi } from "../services/ChatServise";
import { MasterClassApi } from "../services/MasterClassServise";
// import userReducer from "../../models/UserSlice";

const rootReducer = combineReducers({
  // user: userReducer,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [MasterClassApi.reducerPath]: MasterClassApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      registerAPI.middleware,
      authAPI.middleware,
      messageApi.middleware,
      MasterClassApi.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
