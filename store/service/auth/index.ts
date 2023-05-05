import { setAccessToken } from "@/store/features/auth";
import { InfoSignIn, SignInUser } from "@/store/types/auth";
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
    };
  },
});

export const { useSignInMutation } = authApi;
