import { setProfile, updateProfile } from "@/store/features/profile";
import { MyProfileType, UpdateProfile } from "@/store/types/profile";
import { baseApi } from "..";
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
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
    };
  },
});

export const { useUpdateProfileMutation, useSearchFriendsMutation } = chatsApi;
