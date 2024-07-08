import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { RegisterUserData } from "./types.user";
import { MMKVStorage } from "@/store/mmkv.store";

import { UserRegisterResponse } from "./user.dto";

async function registerByApi(registerUserData: RegisterUserData) {
  try {
    const response = await api.post<UserRegisterResponse>(
      ApiUrls.user.registerUser(),
      registerUserData,
    );

    return response.data;
  } catch (e) {
    const err = e as {
      message: string;
    };

    if (err.message.includes("Network Error")) {
      throw new Error("register user needs to be online");
    }
    throw err;
  }
}

export const UserService = (inMemory: boolean = false) => {
  const registration = async (registerUserData: RegisterUserData) => {
    if (inMemory) {
      throw new Error("register user needs to be online");
    } else {
      return registerByApi(registerUserData);
    }
  };

  return { registration };
};
