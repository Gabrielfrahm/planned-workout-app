import { Stack } from "expo-router";
import "../styles/global.css";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarColor: "#54A651",
        }}
      >
        <Stack.Screen name="welcome/index" />
        <Stack.Screen name="signIn/index" />
        <Stack.Screen name="signUp/index" />
      </Stack>
      <Toast />
    </>
  );
}
