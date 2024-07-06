import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { AuthData } from "./auth.types";
import { MMKVStorage } from "@/store/mmkv.store";
import { useUserStore } from "@/store/user.store";

async function authenticateViaApi(authData: AuthData) {
  const { setToken, setUserInfo } = useUserStore.getState();
  try {
    const response = await api.post(ApiUrls.auth.authentications(), authData);

    MMKVStorage.set(`userInfo`, JSON.stringify(response.data.user));

    setUserInfo(response.data.user);

    MMKVStorage.set(`auth`, response.data.token);
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    const err = error as {
      message: string;
    };
    if (err.message.includes("Network Error")) {
      return authenticateViaMMKV(authData);
    }
    throw err;
  }
}

async function authenticateViaMMKV(authData: AuthData) {
  const authentication = MMKVStorage.getString(`auth`);
  if (!authentication) {
    throw new Error("login needs to be online");
  }

  MMKVStorage.set(`auth`, JSON.stringify(authentication));

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
