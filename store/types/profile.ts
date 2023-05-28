export interface Friend {
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
  requester: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
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
