import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import { setError } from "../features/global-error";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(setError(action.payload));
      console.warn("We got a rejected action!");
    }
    return next(action);
  };
