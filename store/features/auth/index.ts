import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type State = {
  accessToken: string | null;
};
const initialState: State = {
  accessToken: null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
    },
  },
});
export const { setAccessToken } = authSlice.actions;
export const infoToken = (state: RootState) => state.Auth.accessToken;
