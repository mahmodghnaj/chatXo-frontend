import { MyProfileType } from "./profile";

export interface SignInUser {
  email: string;
  password: string;
}
export interface SignUpUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface InfoSignIn {
  accessToken: string;
  refreshToken: string;
}
export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface Session {
  user: MyProfileType;
  accessToken: string;
  refreshToken: string;
}
