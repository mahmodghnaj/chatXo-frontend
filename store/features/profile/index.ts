import { RootState } from "@/store";
import {
  ChangeStatusUser,
  MappingFriendType,
  MyProfileType,
} from "@/store/types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  profile: MyProfileType | null;
  loadingMappingFriendId: string[];
};
const initialState: State = {
  profile: null,
  loadingMappingFriendId: [],
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

    mappingFriend(state, { payload }: PayloadAction<MappingFriendType>) {
      if (payload.type == "accept") {
        if (payload.friendRequester) {
          const recipientObj = state.profile?.friends.find(
            (obj) => obj.id == payload?.friendRequester?.id
          );
          if (recipientObj) recipientObj.status = 3;
        }
        if (payload.friendRecipient) {
          const requesterObj = state.profile?.friends.find(
            (obj) => obj.id == payload?.friendRecipient?.id
          );
          if (requesterObj) requesterObj.status = 3;
        }
      } else if (payload.type == "reject") {
        //
        if (payload.friendRequester) {
          const index = state.profile?.friends.findIndex(
            (obj) => obj.id == payload?.friendRequester?.id
          );
          if (index !== undefined && index !== -1) {
            state.profile?.friends.splice(index, 1);
          }
        }
        if (payload.friendRecipient) {
          const index = state.profile?.friends.findIndex(
            (obj) => obj.id == payload?.friendRecipient?.id
          );

          if (index !== undefined && index !== -1) {
            state.profile?.friends.splice(index, 1);
          }
        }
        //
      } else if (payload.type == "add") {
        if (payload?.friendRecipient)
          state.profile?.friends.push(payload?.friendRecipient);
        if (payload?.friendRequester)
          state.profile?.friends.push(payload?.friendRequester);
      }
    },
    changeStatusFriend(state, { payload }: PayloadAction<ChangeStatusUser>) {
      state.profile?.friends.forEach((element) => {
        if (element.recipient.id == payload.id) {
          element.recipient.status = payload.status;
          if (payload.lastSeenAt)
            element.recipient.lastSeenAt = payload.lastSeenAt;
        }
        if (element.requester.id == payload.id) {
          element.requester.status = payload.status;
          if (payload.lastSeenAt)
            element.requester.lastSeenAt = payload.lastSeenAt;
        }
      });
    },
    addLoadingMappingFriendId(state, { payload }: PayloadAction<string>) {
      state.loadingMappingFriendId.push(payload);
    },
    deleteLoadingMappingFriendId(state, { payload }: PayloadAction<string>) {
      const index = state.loadingMappingFriendId.findIndex(
        (item) => item == payload
      );
      state.loadingMappingFriendId.splice(index, 1);
    },
  },
});
export const {
  setProfile,
  updateProfile,
  mappingFriend,
  changeStatusFriend,
  addLoadingMappingFriendId,
  deleteLoadingMappingFriendId,
} = profileSlice.actions;
export const profile = (state: RootState) => state.Profile.profile;
export const loadingMappingFriendId = (state: RootState) =>
  state.Profile.loadingMappingFriendId;
export const friends = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 3);
export const friendshipRequests = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 2);
export const friendsSending = (state: RootState) =>
  state.Profile.profile?.friends.filter((item) => item.status === 1);
