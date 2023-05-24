import { RootState } from "@/store";
import { MyInfoType } from "@/store/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type State = {
  accessToken: string | null;
  refreshToken: string | null;
  myInfo: MyInfoType | null;
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
      Cookies.set("accessToken", payload);
      state.accessToken = payload;
    },
    setRefreshToken(state, { payload }: PayloadAction<string>) {
      state.refreshToken = payload;
    },
    setMeInfo(state, { payload }: PayloadAction<MyInfoType>) {
      state.myInfo = payload;
    },
  },
});
export const { setAccessToken, setRefreshToken } = authSlice.actions;
export const infoToken = (state: RootState) => state.Auth.accessToken;
