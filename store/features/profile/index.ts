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
    acceptFriend(state, { payload }: PayloadAction<string>) {
      const recipientObj = state.profile?.friends.find(
        (obj) => obj.recipient.id === payload
      );
      if (recipientObj) recipientObj.status = 3;
    },
    rejectFriend(state, { payload }: PayloadAction<string>) {
      const recipientIndex = state.profile?.friends.findIndex(
        (obj) => obj.recipient.id === payload
      );
      if (recipientIndex && recipientIndex !== -1) {
        state.profile?.friends.splice(recipientIndex, 1);
      }
    },
  },
});
export const { setProfile, updateProfile, acceptFriend, rejectFriend } =
  profileSlice.actions;
export const profile = (state: RootState) => state.Profile.profile;
export const friends = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 3);
export const friendshipRequests = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 2);
export const friendsSending = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 1);
