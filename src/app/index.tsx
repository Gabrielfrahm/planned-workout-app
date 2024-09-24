import { Redirect } from "expo-router";
import "@/lang/i18n";
import {
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useConfigStore } from "@/store/config.store";
import { useUserStore } from "@/store/user.store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
GoogleSignin.configure({});
export default function Index() {
  const isPassToBegging = useConfigStore((set) => set.isPassToBegging);
  const token = useUserStore((state) => state.token);

  let [fontsLoaded, fontError] = useFonts({
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  if (isPassToBegging) {
    return <Redirect href="/signIn" />;
  }

  return <Redirect href="/welcome" />;
}
