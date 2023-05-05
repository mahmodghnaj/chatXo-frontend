import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./features/auth";
import { globalErrorSlice } from "./features/global-error";
import { rtkQueryErrorLogger } from "./middleware/general-error";
import { baseApi } from "./service";

const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [globalErrorSlice.name]: globalErrorSlice.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        baseApi.middleware,
        rtkQueryErrorLogger,
      ]),
  });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
