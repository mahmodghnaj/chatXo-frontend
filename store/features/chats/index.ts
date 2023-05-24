import { RootState } from "@/store";
import {
  ChatType,
  LocalCurrentChatType,
  MessageType,
} from "@/store/types/chats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type State = {
  currentChat: ChatType | null;
  localCurrentChat: LocalCurrentChatType | null;
  messages: MessageType[];
  totalMessages: number | undefined;
  chats: ChatType[];
  totalChats: number | undefined;
  loadingGetMessages: boolean;
};
const initialState: State = {
  currentChat: null,
  localCurrentChat: null,
  messages: [],
  totalMessages: undefined,
  loadingGetMessages: false,
  chats: [],
  totalChats: undefined,
};
export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setCurrentChat(state, { payload }: PayloadAction<ChatType>) {
      state.currentChat = payload;
    },
    setChats(state, { payload }: PayloadAction<ChatType[]>) {
      state.chats.push(...payload);
    },
    setTotalChats(state, { payload }: PayloadAction<number | undefined>) {
      state.totalChats = payload;
    },
    setMessages(state, { payload }: PayloadAction<MessageType[]>) {
      state.messages.push(...payload);
    },
    setTotalMessages(state, { payload }: PayloadAction<number | undefined>) {
      state.totalMessages = payload;
    },
    resetChats(state) {
      state.chats = [];
    },
    resetMessages(state) {
      state.messages = [];
      state.totalMessages = undefined;
    },
    setLoadingGetMessages(state, { payload }: PayloadAction<boolean>) {
      state.loadingGetMessages = payload;
    },
    addNewMessage(state, { payload }: PayloadAction<MessageType>) {
      if (state?.currentChat?.id == payload.room) {
        state.messages.unshift(payload);
        if (state.totalMessages) state.totalMessages += 1;
      }
    },
    setLocalCurrentChat(
      state,
      { payload }: PayloadAction<LocalCurrentChatType | null>
    ) {
      state.localCurrentChat = payload;
    },
  },
});
export const {
  setCurrentChat,
  setChats,
  resetChats,
  setTotalChats,
  setMessages,
  setTotalMessages,
  resetMessages,
  setLoadingGetMessages,
  addNewMessage,
  setLocalCurrentChat,
} = chatsSlice.actions;
export const currentChat = (state: RootState) => state.Chats.currentChat;
export const chats = (state: RootState) => state.Chats.chats;
export const totalChats = (state: RootState) => state.Chats.totalChats;
export const messages = (state: RootState) =>
  [...state.Chats.messages].reverse();
export const totalMessages = (state: RootState) => state.Chats.totalMessages;
export const loadingGetMessages = (state: RootState) =>
  state.Chats.loadingGetMessages;

export const localCurrentChat = (state: RootState) =>
  state.Chats.localCurrentChat;
