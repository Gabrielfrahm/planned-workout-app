import { create } from "zustand";
import { MMKVStorage } from "./mmkv.store";

export type UserInfo = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

type UserStore = {
  token: string;
  setToken: (token: string) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};

const tokenMMKV = MMKVStorage.getString(`auth`);
const userInfoMMKV = MMKVStorage.getString(`userInfo`);

export const useUserStore = create<UserStore>((set) => ({
  token: tokenMMKV ?? "",
  setToken: (token: string) => {
    MMKVStorage.set(`auth`, token);
    set({ token });
  },
  userInfo: userInfoMMKV ? JSON.parse(userInfoMMKV) : ({} as UserInfo),
  setUserInfo: (userInfo: UserInfo) => {
    MMKVStorage.set(`userInfo`, JSON.stringify(userInfo));
    set({ userInfo });
  },
}));
