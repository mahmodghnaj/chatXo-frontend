import {
  acceptFriend,
  rejectFriend,
  setProfile,
  updateProfile,
} from "@/store/features/profile";
import { MyProfileType, UpdateProfile } from "@/store/types/auth";
import { baseApi } from "..";
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProfile: builder.query<MyProfileType, void>({
        query: () => ({
          url: `/auth/me`,
          onSuccess: async (dispatch, data) => {
            const res = data as MyProfileType;
            dispatch(setProfile(res));
          },
        }),
      }),
      updateProfile: builder.mutation<MyProfileType, UpdateProfile>({
        query: (arg) => ({
          method: "patch",
          url: "users",
          data: arg,
          onSuccess: async (dispatch, data) => {
            const res = data as MyProfileType;
            dispatch(updateProfile(res));
          },
        }),
      }),
      searchFriends: builder.mutation<
        { data: MyProfileType[] },
        { name: string }
      >({
        query: (arg) => ({
          url: "users/search",
          params: arg,
        }),
      }),
      acceptFriend: builder.mutation<{ friendId: string }, string>({
        query: (arg) => ({
          url: "friends/accept",
          method: "patch",
          data: { idFriend: arg },
          onSuccess: async (dispatch, data) => {
            const res = data as { friendId: string };
            dispatch(acceptFriend(res.friendId));
          },
        }),
      }),
      rejectFriend: builder.mutation<{ friendId: string }, string>({
        query: (arg) => ({
          url: "friends/reject",
          method: "patch",
          data: { idFriend: arg },
          onSuccess: async (dispatch, data) => {
            const res = data as { friendId: string };
            dispatch(rejectFriend(res.friendId));
          },
        }),
      }),
    };
  },
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useSearchFriendsMutation,
  useAcceptFriendMutation,
  useRejectFriendMutation,
} = chatsApi;
