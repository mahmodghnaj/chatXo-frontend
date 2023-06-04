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
}

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
    setCurrentChat: (state, { payload }: PayloadAction<ChatType>) => {
      state.localCurrentChat = null;
      state.currentChat = payload;
    },
    setChats: (state, { payload }: PayloadAction<ChatType[]>) => {
      state.chats.push(...payload);
    },
    setTotalChats: (state, { payload }: PayloadAction<number | undefined>) => {
      state.totalChats = payload;
    },
    setMessages: (state, { payload }: PayloadAction<MessageType[]>) => {
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
          state.currentChat.lastMessage.received = true;
          if (chat) chat.lastMessage.received = true;
        } else {
          state.currentChat.lastMessage.received = false;
        }
      }
      if (chat) {
        chat.user.status = payload.status;
        if (payload.lastSeenAt) chat.user.lastSeenAt = payload.lastSeenAt;
      }
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
