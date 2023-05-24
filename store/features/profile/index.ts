import { RootState } from "@/store";
import { MyProfileType } from "@/store/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  profile: MyProfileType | null;
};
const initialState: State = {
  profile: null,
};
export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfile(state, { payload }: PayloadAction<MyProfileType>) {
      state.profile = payload;
    },
    updateProfile(state, { payload }: PayloadAction<MyProfileType>) {
      state.profile = { ...state.profile, ...payload };
    },
  },
});
export const { setProfile, updateProfile } = profileSlice.actions;
export const profile = (state: RootState) => state.Profile.profile;
export const friends = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 3);
