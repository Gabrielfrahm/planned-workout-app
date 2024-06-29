import * as Network from "expo-network";

export const checkInternetConnectivity = async () => {
  const isConnected = await Network.getNetworkStateAsync();
  if (isConnected.isConnected) {
    return true;
  } else {
    return false;
  }
};
