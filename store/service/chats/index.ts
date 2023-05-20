import {
  setChats,
  setMessages,
  setTotalChats,
  setTotalMessages,
} from "@/store/features/chats";
import { ChatType, MessageType } from "@/store/types/chats";
import { QueryArgs, ResponsivePagination } from "@/store/types/general";
import { baseApi } from "..";
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getChats: builder.query<ResponsivePagination<ChatType>, QueryArgs>({
        query: (args) => ({
          url: `/room`,
          params: { ...args.params },
          onSuccess: async (dispatch, data) => {
            const res = data as ResponsivePagination<ChatType>;
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
      getMessage: builder.query<ResponsivePagination<MessageType>, QueryArgs>({
        query: (args) => ({
          url: `/room/${args.id}`,
          params: { ...args.params },
          onSuccess: async (dispatch, data) => {
            const res = data as ResponsivePagination<MessageType>;
            dispatch(setMessages(res.data));
            dispatch(setTotalMessages(res.total));
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

export const { useGetChatsQuery, useGetMessageQuery } = chatsApi;
