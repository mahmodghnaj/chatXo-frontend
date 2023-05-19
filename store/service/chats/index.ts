import { setChats, setTotalChats } from "@/store/features/chats";
import { ChatType } from "@/store/types/chats";
import { baseApi } from "..";
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getChats: builder.query<{ data: ChatType[]; total?: number }, number>({
        query: (page) => ({
          url: `/room?page=${page}&limit=10&total=true`,
          onSuccess: async (dispatch, data) => {
            const res = data as { data: ChatType[]; total?: number };
            console.log(res);
            dispatch(setChats(res.data));
            dispatch(setTotalChats(res.total));
          },
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems) => {
          currentCache.data.push(...newItems.data);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    };
  },
});

export const { useGetChatsQuery } = chatsApi;
