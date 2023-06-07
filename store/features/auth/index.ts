import { RootState } from "@/store";
import { MyProfileType } from "@/store/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type State = {
  accessToken: string | null;
  refreshToken: string | null;
  myInfo: MyProfileType | null;
};
const initialState: State = {
  accessToken: null,
  refreshToken: null,
  myInfo: null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
    },
    setRefreshToken(state, { payload }: PayloadAction<string>) {
      state.refreshToken = payload;
      Cookies.set("refresh", payload, {
        expires: new Date(new Date().setDate(new Date().getDate() + 60)),
      });
    },
    setMeInfo(state, { payload }: PayloadAction<MyProfileType>) {
      state.myInfo = payload;
    },
  },
});
export const { setAccessToken, setRefreshToken } = authSlice.actions;
export const infoToken = (state: RootState) => state.Auth.accessToken;
