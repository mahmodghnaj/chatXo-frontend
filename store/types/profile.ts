export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  lastSeenAt: Date;
  status: "Online" | "Offline";
}

export interface Friend {
  recipient: User;
  requester: User;
  createdAt: Date;
  status: 0 | 1 | 2 | 3;
  // 0, 'add friend',
  // 1, 'requested',
  // 2, 'pending',
  // 3, 'friends'
  updatedAt: Date;
  id: string;
}

export interface MyProfileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  friends: Friend[];
  status: "Online" | "Offline";
  lastSeenAt: Date;
  socialId?: string;
  socialType?: string;
}
export interface UpdateProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface MappingFriendType {
  idFriend: string;
  type: "add" | "accept" | "reject";
  friendRequester?: Friend;
  friendRecipient?: Friend;
}
export interface ChangeStatusUser {
  id: string;
  status: "Online" | "Offline";
  lastSeenAt?: Date;
}
