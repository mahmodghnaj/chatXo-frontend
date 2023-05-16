import { setChats } from "@/store/features/chats";
import { ChatType } from "@/store/types/chats";
import { baseApi } from "..";
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getChats: builder.query<
        { data: ChatType[]; total?: number },
        number | void
      >({
        query: (page) => ({
          url: `/room?page=${page}&limit=20`,
          serializeQueryArgs: ({ endpointName }) => {
            return endpointName;
          },
          merge: (currentCache, newItems) => {
            currentCache.results.push(...newItems.results);
          },
          forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg;
          },
          onSuccess: async (dispatch, data) => {
            const res = data as { data: ChatType[]; total?: number };
            dispatch(setChats(res.data));
          },
        }),
      }),
    };
  },
});

export const { useGetChatsQuery } = chatsApi;
