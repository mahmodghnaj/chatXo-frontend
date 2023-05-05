import { AppDispatch } from "@/store";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig } from "axios";
import axios from "./axios";
interface CustomQueryArgs extends AxiosRequestConfig {
  onSuccess?: (dispatch: AppDispatch, data: unknown) => Promise<void>;
}
export type CustomBaseQueryType = BaseQueryFn<CustomQueryArgs>;
export const axiosBaseQuery: CustomBaseQueryType = async (
  { onSuccess, ...args },
  { dispatch },
  extraOptions
) => {
  try {
    const result = await axios.request(args);

    if (onSuccess) {
      //errors doesn't throw up, so we need to use try catch here
      try {
        await onSuccess(dispatch, result.data);
      } catch (e) {
        console.error("Error in onSuccess method", e);
        throw e;
      }
    }
    return { data: result.data };
  } catch (error: unknown) {
    return {
      error: error,
    };
  }
};
