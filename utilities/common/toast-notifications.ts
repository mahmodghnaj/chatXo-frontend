import { isRejectedWithValue } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
export const toastNotifications = (notification: any) => {
  if (isRejectedWithValue(notification)) {
    const payload: AxiosError<any> = notification.payload;
    toast.error(payload.response?.data?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
  }
};
