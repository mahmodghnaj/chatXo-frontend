import { setAccessToken } from "@/store/features/auth";
import { InfoSignIn, SignInUser, SignUpUser } from "@/store/types/auth";
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
    };
  },
});

export const { useSignInMutation, useSignUpMutation } = authApi;
