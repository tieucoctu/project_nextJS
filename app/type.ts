import { User } from "next-auth";
export interface TypeCreatePost {
  prompt?: string;
  tag?: string;
}
interface creator extends User {
  _id?: string;
  username: string;
}

export interface TypePost {
  prompt: string;
  _id?: string;
  tag: string;
  _vd?: number;
  creator: creator;
}
