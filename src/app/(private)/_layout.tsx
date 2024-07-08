import { Tabs } from "expo-router";
import "../../styles/global.css";
import Toast from "react-native-toast-message";
import { Home, User } from "lucide-react-native";
import { Dimensions, View } from "react-native";
import useBackgroundSync from "@/lib/sync";
import NetworkStatusNotifier from "@/components/networkInfo";
const { width } = Dimensions.get("window");

export default function Layout() {
  useBackgroundSync();
  return (
    <>
      <NetworkStatusNotifier />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#54A651",
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            backgroundColor: "#212226",
            borderColor: "transparent",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            width: width * 0.9,
            left: (width - width * 0.9) / 2,
            height: 65,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <View className="border-t-4 border-dark-green h-full  w-14 justify-center items-center">
                    <Home
                      style={{
                        position: "absolute",
                      }}
                      color={"#54A651"}
                      size={30}
                    />
                  </View>
                );
              }
              return (
                <View className="h-full w-14 justify-center items-center">
                  <Home color={"#f2f2f2"} size={30} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="some"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <View className="justify-center items-center w-24 h-24 relative bottom-6 rounded-full bg-black">
                    <User color={"#54A651"} size={30} />
                  </View>
                );
              }
              return (
                <View className="justify-center items-center w-24 h-24 relative bottom-6 rounded-full bg-black">
                  <User color={"#F2F2F2"} size={30} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <View className="border-t-4 border-dark-green h-full  w-14 justify-center items-center">
                    <User
                      style={{
                        position: "absolute",
                      }}
                      color={"#54A651"}
                      size={30}
                    />
                  </View>
                );
              }
              return <User color={"#F2F2F2"} size={30} />;
            },
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
