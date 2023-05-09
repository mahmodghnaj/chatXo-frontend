import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth";
import { GeneralNotifications } from "./middleware/general-notifications";
import { baseApi } from "./service";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware, GeneralNotifications]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
