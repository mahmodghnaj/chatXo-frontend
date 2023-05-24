import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth";
import { chatsSlice } from "./features/chats";
import { profileSlice } from "./features/profile";
import { GeneralNotifications } from "./middleware/general-notifications";
import { baseApi } from "./service";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [chatsSlice.name]: chatsSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware, GeneralNotifications]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
