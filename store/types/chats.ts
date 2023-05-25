export interface ChatType {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageType {
  text: string;
  user: string;
  room: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
  id: string;
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
}
