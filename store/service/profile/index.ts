import { setProfile, updateProfile } from "@/store/features/profile";
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
    };
  },
});

export const { useGetProfileQuery, useUpdateProfileMutation } = chatsApi;
