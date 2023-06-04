import { setAccessToken, setRefreshToken } from "@/store/features/auth";
import { setProfile } from "@/store/features/profile";
import { InfoSignIn, SignInUser, SignUpUser } from "@/store/types/auth";
import { Session } from "@/store/types/auth";
import { baseApi } from "..";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      signIn: builder.mutation<InfoSignIn, SignInUser>({
        query: (req) => ({
          url: "auth/login",
          method: "Post",
          data: req,
          onSuccess: async (dispatch, data) => {
            const res = data as InfoSignIn;
            dispatch(setAccessToken(res.accessToken));
          },
        }),
      }),
      signUp: builder.mutation<InfoSignIn, SignUpUser>({
        query: (arg) => ({
          method: "post",
          url: "auth/register",
          data: arg,
          onSuccess: async (dispatch, data) => {
            console.log(data);
          },
        }),
      }),
      getSession: builder.query<Session, void>({
        query: () => ({
          url: `/auth/session`,
          onSuccess: async (dispatch, data) => {
            const res = data as Session;
            dispatch(setAccessToken(res.accessToken));
            dispatch(setRefreshToken(res.refreshToken));
            dispatch(setProfile(res.user));
          },
        }),
      }),
    };
  },
});

export const { useSignInMutation, useSignUpMutation, useGetSessionQuery } =
  authApi;
