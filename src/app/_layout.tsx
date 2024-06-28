import { Stack } from "expo-router";
import "../styles/global.css";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarColor: "#54A651",
      }}
    >
      <Stack.Screen name="signIn/index" />
      <Stack.Screen name="signUp/index" />
      <Stack.Screen name="wellcome/index" />
    </Stack>
  );
}
