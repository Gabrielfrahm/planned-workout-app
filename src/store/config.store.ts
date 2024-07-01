import { create } from "zustand";
import { MMKVStorage } from "./mmkv.store";

type ConfigState = {
  lang: string;
  setLang: (language: string) => void;
  isPassToBegging: boolean;
  setPassToBegging: (isPassToBegging: boolean) => void;
};

const langMMKV = MMKVStorage.getString("lang");
const isPassToBeggingMMKV = MMKVStorage.getBoolean("isPassToBegging");

export const useConfigStore = create<ConfigState>((set) => ({
  lang: langMMKV ?? "en",
  setLang: (lang: string) => {
    MMKVStorage.set("lang", lang);
    set({ lang });
  },
  isPassToBegging: isPassToBeggingMMKV ?? false,
  setPassToBegging: (isPassToBegging: boolean) => {
    MMKVStorage.set("isPassToBegging", isPassToBegging);
    set({ isPassToBegging });
  },
}));
