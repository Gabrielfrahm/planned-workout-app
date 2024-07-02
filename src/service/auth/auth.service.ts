import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { AuthData } from "./auth.types";
import { MMKVStorage } from "@/store/mmkv.store";

async function authenticateViaApi(authData: AuthData) {
  try {
    const response = await api.post(ApiUrls.auth.authentications(), authData);
    return response.data;
  } catch (error) {
    const err = error as {
      message: string;
    };
    if (err.message.includes("Network Error")) {
      return authenticateViaMMKV(authData);
    }
  }
}

async function authenticateViaMMKV(authData: AuthData) {
  const authentication = MMKVStorage.getString(`auth`);
  console.log(authentication);
  if (!authentication) {
    throw new Error("User not found");
  }
  return {
    data: authentication,
  };
}

export const AuthService = (inMemory: boolean = false) => {
  const authentication = async (authData: AuthData) => {
    if (inMemory) {
      return authenticateViaMMKV(authData);
    } else {
      return authenticateViaApi(authData);
    }
  };

  return { authentication };
};
