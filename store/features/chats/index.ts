import { RootState } from "@/store";
import { ChatType } from "@/store/types/chats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type State = {
  currentChat: ChatType | null;
  chats: ChatType[];
  totalChats: number | undefined;
};
const initialState: State = {
  currentChat: null,
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
    resetChats(state) {
      state.chats = [];
    },
  },
});
export const { setCurrentChat, setChats, resetChats, setTotalChats } =
  chatsSlice.actions;
export const chats = (state: RootState) => state.Chats.chats;
export const totalChats = (state: RootState) => state.Chats.totalChats;
export const currentChat = (state: RootState) => state.Chats.currentChat;
