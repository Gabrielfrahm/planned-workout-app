import { useEffect } from "react";
import { AppState } from "react-native";

const useBackgroundSync = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        // Tente sincronizar quando o app volta para o estado ativo
        console.log("sincronizando dados...");
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useBackgroundSync;
