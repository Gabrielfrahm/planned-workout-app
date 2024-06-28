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

export default function Index() {
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

  return <Redirect href="/welcome" />;
}
