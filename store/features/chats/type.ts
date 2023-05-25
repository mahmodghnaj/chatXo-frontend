import {
  ChatType,
  LocalCurrentChatType,
  MessageType,
} from "@/store/types/chats";

export type State = {
  currentChat: ChatType | null;
  localCurrentChat: LocalCurrentChatType | null;
  messages: MessageType[];
  totalMessages: number | undefined;
  chats: ChatType[];
  totalChats: number | undefined;
  loadingGetMessages: boolean;
};
