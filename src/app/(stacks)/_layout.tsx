import { Stack } from "expo-router";
import "../../styles/global.css";
import Toast from "react-native-toast-message";
import useBackgroundSync from "@/lib/sync";
import NetworkStatusNotifier from "@/components/networkInfo";

export default function LayoutExercise() {
  useBackgroundSync();

  return (
    <>
      <NetworkStatusNotifier />
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarColor: "#54A651",
        }}
      >
        <Stack.Screen name="exercises/[workoutId]" options={{}} />
      </Stack>
      <Toast />
    </>
  );
}
