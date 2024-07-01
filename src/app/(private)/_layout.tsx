import { Tabs } from "expo-router";
import "../../styles/global.css";
import Toast from "react-native-toast-message";
import { Home } from "lucide-react-native";

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return <Home color={"#54A651"} size={30} />;
              }
              return <Home color={"#F2F2F2"} size={24} />;
            },
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
