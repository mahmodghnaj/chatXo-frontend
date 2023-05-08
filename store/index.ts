import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth";
import { globalErrorSlice } from "./features/global-error";
import { rtkQueryErrorLogger } from "./middleware/general-error";
import { baseApi } from "./service";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [globalErrorSlice.name]: globalErrorSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware, rtkQueryErrorLogger]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
