import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  AddNewMessage,
  ChatType,
  LocalCurrentChatType,
  MessageType,
} from "@/store/types/chats";
import { ChangeStatusUser } from "@/store/types/profile";

interface State {
  currentChat: ChatType | null;
  localCurrentChat: LocalCurrentChatType | null;
  messages: MessageType[];
  totalMessages?: number;
  loadingGetMessages: boolean;
  chats: ChatType[];
  totalChats?: number;
  loadingDeleteAllChats: boolean;
  loadingDeleteChat: boolean;
}

const initialState: State = {
  currentChat: null,
  localCurrentChat: null,
  messages: [],
  totalMessages: undefined,
  loadingGetMessages: false,
  chats: [],
  totalChats: undefined,
  loadingDeleteAllChats: false,
  loadingDeleteChat: false,
};

export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setCurrentChat: (state, { payload }: PayloadAction<ChatType | null>) => {
      state.localCurrentChat = null;
      state.currentChat = payload;
    },
    setChats: (state, { payload }: PayloadAction<ChatType[]>) => {
      if (state.chats.length == 1) {
        state.chats = []; //TODO::Check
      }
      state.chats.push(...payload);
    },
    setTotalChats: (state, { payload }: PayloadAction<number | undefined>) => {
      state.totalChats = payload;
    },
    setMessages: (state, { payload }: PayloadAction<MessageType[]>) => {
      if (state.messages.length === 1) state.messages = [];
      state.messages.push(...payload);
    },
    setTotalMessages: (
      state,
      { payload }: PayloadAction<number | undefined>
    ) => {
      state.totalMessages = payload;
    },
    resetChats: (state) => {
      state.chats = [];
      state.totalChats = undefined;
    },
    resetMessages: (state) => {
      state.messages = [];
      state.totalMessages = undefined;
    },
    setLoadingGetMessages: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingGetMessages = payload;
    },
    addNewMessage: (state, { payload }: PayloadAction<AddNewMessage>) => {
      if (state.currentChat?.id === payload.idRoom) {
        state.messages.unshift(payload.message);
        if (state.totalMessages) {
          state.totalMessages += 1;
        }
      }
      const index = state.chats.findIndex((item) => item.id == payload.idRoom);
      if (index !== -1) {
        const topChat = state.chats[index];
        topChat.lastMessage = payload.message;
        state.chats.splice(index, 1);
        state.chats.unshift(topChat);
      }
    },
    setLocalCurrentChat: (
      state,
      { payload }: PayloadAction<LocalCurrentChatType | null>
    ) => {
      state.localCurrentChat = payload;
    },
    addNewChat: (state, { payload }: PayloadAction<ChatType>) => {
      state.chats.unshift(payload);
      if (state.totalChats) state.totalChats += 1;
    },
    changeStatusUser(state, { payload }: PayloadAction<ChangeStatusUser>) {
      const chat = state.chats.find((item) => item.user.id == payload.id);

      if (state?.currentChat?.user.id == payload.id) {
        state.currentChat.user.status = payload.status;

        if (payload.lastSeenAt) {
          state.currentChat.user.lastSeenAt = payload.lastSeenAt;
        }
        if (payload.status == "Online") {
          state.messages.forEach((element) => {
            element.received = true;
          });
          state.currentChat.lastMessage
            ? (state.currentChat.lastMessage.received = true)
            : "";
          if (chat) chat.lastMessage.received = true;
        } else {
          state.currentChat.lastMessage
            ? (state.currentChat.lastMessage.received = false)
            : "";
        }
      }
      if (chat) {
        chat.user.status = payload.status;
        if (payload.lastSeenAt) chat.user.lastSeenAt = payload.lastSeenAt;
      }
    },

    setLoadingDeleteAll(state, { payload }: PayloadAction<boolean>) {
      state.loadingDeleteAllChats = payload;
    },
    deleteAllChat(state, { payload }: PayloadAction<void>) {
      state.chats = [];
      state.totalChats = undefined;
      state.messages = [];
      state.totalMessages = undefined;
      state.currentChat = null;
      state.localCurrentChat = null;
      state.loadingDeleteAllChats = false;
    },
    setLoadingDeleteChat(state, { payload }: PayloadAction<boolean>) {
      state.loadingDeleteChat = payload;
    },
    deleteChat(state, { payload }: PayloadAction<string>) {
      const index = state.chats.findIndex((item) => item.id == payload);
      if (index !== -1) {
        state.chats.splice(index, 1);
        if (state.totalChats) state.totalChats -= 1;
      }
      if (state.currentChat?.id == payload) {
        state.currentChat = null;
        state.messages = [];
        state.totalMessages = undefined;
      }
      state.loadingDeleteChat = false;
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
  addNewChat,
  changeStatusUser,
  deleteChat,
  setLoadingDeleteAll,
  deleteAllChat,
  setLoadingDeleteChat,
} = chatsSlice.actions;

export const currentChat = (state: RootState) => state.Chats.currentChat;
export const chats = (state: RootState) => {
  const data = [...state.Chats.chats];
  return data.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt);
    const updatedAtB = new Date(b.updatedAt);
    return updatedAtB.getTime() - updatedAtA.getTime();
  });
};
export const totalChats = (state: RootState) => state.Chats.totalChats;
export const messages = (state: RootState) =>
  [...state.Chats.messages].reverse();
export const totalMessages = (state: RootState) => state.Chats.totalMessages;
export const loadingGetMessages = (state: RootState) =>
  state.Chats.loadingGetMessages;
export const localCurrentChat = (state: RootState) =>
  state.Chats.localCurrentChat;
export const loadingDeleteAllChats = (state: RootState) =>
  state.Chats.loadingDeleteAllChats;
export const loadingDeleteChat = (state: RootState) =>
  state.Chats.loadingDeleteChat;
