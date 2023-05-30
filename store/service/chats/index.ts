import {
  addNewChat,
  setChats,
  setCurrentChat,
  setLoadingGetMessages,
  setLocalCurrentChat,
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
          url: `/room/message/${args.id}`,
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
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          dispatch(setLoadingGetMessages(true));
          await queryFulfilled;
          dispatch(setLoadingGetMessages(false));
        },
      }),
      checkChat: builder.mutation<{ room: ChatType | null }, string>({
        query: (id) => ({
          url: `room/check/${id}`,
          onSuccess: async (dispatch, data) => {
            const res = data as { room: ChatType | null };
            if (res.room) {
              dispatch(setCurrentChat(res.room));
            }
          },
        }),
      }),
      addRoom: builder.mutation<ChatType, { user: string }>({
        query: (body) => ({
          url: `room`,
          method: "post",
          data: body,
          onSuccess: async (dispatch, data) => {
            const res = data as ChatType;
            dispatch(setCurrentChat(res));
            dispatch(setLocalCurrentChat(null));
            dispatch(addNewChat(res));
          },
        }),
      }),
      getChat: builder.mutation<ChatType, string>({
        query: (id) => ({
          url: `room/${id}`,
          method: "get",
          onSuccess: async (dispatch, data) => {
            const res = data as ChatType;
            dispatch(addNewChat(res));
          },
        }),
      }),
    };
  },
});

export const {
  useGetChatsQuery,
  useGetMessageQuery,
  useCheckChatMutation,
  useAddRoomMutation,
  useGetChatMutation,
} = chatsApi;
