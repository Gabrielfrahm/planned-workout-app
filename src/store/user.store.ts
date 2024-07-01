import { create } from "zustand";
import { MMKVStorage } from "./mmkv.store";

export type UserInfo = {
  name: string;
  email: string;
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
  userInfo: userInfoMMKV ? JSON.parse(userInfoMMKV) : {},
  setUserInfo: (userInfo: UserInfo) => {
    const { email, name } = userInfo;
    const userInfoMMKVObject: UserInfo = JSON.parse(userInfoMMKV!);
    userInfoMMKVObject.email = email;
    userInfoMMKVObject.name = name;
    MMKVStorage.set(`userInfo`, JSON.stringify(userInfoMMKVObject));
    set({ userInfo });
  },
}));
