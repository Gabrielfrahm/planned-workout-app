import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { AuthData } from "./auth.types";
import { MMKVStorage } from "@/store/mmkv.store";

async function authenticateViaApi(authData: AuthData) {
  try {
    const response = await api.post(ApiUrls.auth.authentications(), authData);
    return response.data;
  } catch (error) {
    console.error("API authentication error:", error);
    throw new Error("Failed to authenticate via API");
  }
}

async function authenticateViaMMKV(authData: AuthData) {
  const authentication = MMKVStorage.getString(`auth`);
  console.log(authentication);
  if (!authentication) {
    // const authInfo = {
    //   email: authData.email,
    //   token: "3303785f-8c56-4b0c-8354-a19dbe9e3a56",
    // };
    // MMKVStorage.set(`auth:${authData.email}`, JSON.stringify(authInfo));
    // authentication = JSON.stringify(authInfo);
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
