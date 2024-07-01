import { MMKVStorage } from "@/store/mmkv.store";
import { useUserStore } from "@/store/user.store";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Index() {
  const setToken = useUserStore((state) => state.setToken);

  return (
    <TouchableOpacity
      onPress={() => {
        MMKVStorage.delete("auth");
        setToken("");
        router.replace("/signIn");
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}
