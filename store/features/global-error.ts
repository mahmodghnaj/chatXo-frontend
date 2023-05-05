import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export type State = {
  error: AxiosError | null;
};
const initialState: State = {
  error: null,
};
export const globalErrorSlice = createSlice({
  name: "GlobalError",
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<AxiosError>) {
      state.error = payload;
    },
  },
});
export const { setError } = globalErrorSlice.actions;
export const error = (state: RootState) => state.GlobalError.error;
