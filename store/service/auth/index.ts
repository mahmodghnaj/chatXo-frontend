import { store } from "@/store";
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
            dispatch(setRefreshToken(res.refreshToken));
          },
        }),
      }),
      signUp: builder.mutation<InfoSignIn, SignUpUser>({
        query: (arg) => ({
          method: "post",
          url: "auth/register",
          data: arg,
          onSuccess: async (dispatch, data) => {
            const res = data as InfoSignIn;
            dispatch(setAccessToken(res.accessToken));
            dispatch(setRefreshToken(res.refreshToken));
          },
        }),
      }),
      getSession: builder.query<Session, void>({
        query: () => ({
          url: `/auth/info-session`,

          method: "get",
          onSuccess: async (dispatch, data) => {
            const res = data as Session;
            dispatch(setAccessToken(res.accessToken));
            dispatch(setRefreshToken(res.refreshToken));
            dispatch(setProfile(res.user));
          },
        }),
      }),
      logout: builder.mutation<string, void>({
        query: (arg) => ({
          method: "get",
          url: "auth/logout",
          onSuccess: async (dispatch, data) => {},
        }),
      }),
    };
  },
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetSessionQuery,
  useLogoutMutation,
} = authApi;
