import { User } from "./profile";

export interface ChatType {
  id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: MessageType;
}

export interface MessageType {
  text: string;
  user: string;
  room: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  received: boolean;
  seenByReceiver: boolean;
}

export interface SendMessageType {
  text: string;
  room: string;
  receiver: string;
}
export interface LocalCurrentChatType {
  id: string;
  firstName: string;
  lastName: string;
  status: "Online" | "Offline";
  lastSeenAt: Date;
}
export interface AddNewMessage {
  message: MessageType;
  idRoom: string;
}
