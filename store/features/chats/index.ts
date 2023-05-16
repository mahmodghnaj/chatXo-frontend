import { RootState } from "@/store";
import { ChatType } from "@/store/types/chats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  currentChat: ChatType | null;
  chats: ChatType[];
};
const initialState: State = {
  currentChat: null,
  chats: [],
};
export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setCurrentChat(state, { payload }: PayloadAction<any>) {
      state.currentChat = payload;
    },
    setChats(state, { payload }: PayloadAction<ChatType[]>) {
      state.chats = payload;
    },
  },
});
export const { setCurrentChat, setChats } = chatsSlice.actions;
export const chats = (state: RootState) => state.Chats.chats;
export const currentChat = (state: RootState) => state.Chats.currentChat;
