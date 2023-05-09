import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toastNotifications } from "@/utilities/common/toast-notifications";
import { toast } from "react-toastify";
toastNotifications;
export const GeneralNotifications: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    toastNotifications(action);
    return next(action);
  };
