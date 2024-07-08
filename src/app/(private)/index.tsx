import { MMKVStorage } from "@/store/mmkv.store";
import { UserInfo, useUserStore } from "@/store/user.store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory-native";
const { width } = Dimensions.get("window");

export default function Index() {
  const setToken = useUserStore((state) => state.setToken);
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const { t } = useTranslation();
  return (
    <ScrollView
      className="bg-grey "
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row justify-between items-center px-4 w-full mt-8 ">
        <View className="bg-black w-[50%] rounded-lg">
          <Text className="text-white p-2">
            {t(`home.welcome`)},{" "}
            <Text className="text-dark-green">{userInfo.name}</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            MMKVStorage.delete("auth");
            setToken("");
            MMKVStorage.delete(`userInfo`);
            setUserInfo({} as UserInfo);
            router.replace("/signIn");
          }}
        >
          <Text>{t("home.logout")}</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center gap-4 items-center py-5">
        <View className="bg-black min-w-[45%] min-h-32">
          <Text>a</Text>
        </View>
        <View className="bg-black min-w-[45%] min-h-32 max-h-32  max-w-[45%]"></View>
      </View>
      <View className="flex-row justify-center gap-4 items-center py-5">
        <View className="bg-black min-w-[45%] min-h-32">
          <Text>a</Text>
        </View>
        <View className="bg-black min-w-[45%] min-h-32">
          <Text>a</Text>
        </View>
      </View>
      <View className="justify-center items-center">
        <Text className="m-0">Treino x semana</Text>

        <View className="bg-black min-w-[93%] min-h-300 justify-center items-center">
          <VictoryChart width={width * 0.9} theme={VictoryTheme.material}>
            <VictoryArea
              style={{ data: { fill: "#54A651" } }}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 6 },
              ]}
            />
          </VictoryChart>
        </View>
      </View>
      <View className="justify-center items-center">
        <Text className="m-0">Treino x semana</Text>

        <View className="bg-black min-w-[93%] min-h-300 justify-center items-center mb-32">
          <VictoryChart width={width * 0.9} theme={VictoryTheme.material}>
            <VictoryArea
              style={{ data: { fill: "#54A651" } }}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 6 },
              ]}
            />
          </VictoryChart>
        </View>
      </View>
    </ScrollView>
  );
}
