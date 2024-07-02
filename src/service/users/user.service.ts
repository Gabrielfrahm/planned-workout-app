import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { RegisterUserData } from "./types.user";
import { MMKVStorage } from "@/store/mmkv.store";

async function registerByApi(registerUserData: RegisterUserData) {
  try {
    const response = await api.post(
      ApiUrls.user.registerUser(),
      registerUserData,
    );
    MMKVStorage.set("auth", response.data.token);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {}
}

export const UserService = (inMemory: boolean = false) => {
  const registration = async (registerUserData: RegisterUserData) => {
    if (inMemory) {
      throw new Error("Network Error");
    } else {
      return registerByApi(registerUserData);
    }
  };

  return { registration };
};