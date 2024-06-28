import { Redirect } from "expo-router";
import "@/lang/i18n";
import {
  Roboto_400Regular,
  Roboto_100Thin_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";

export default function Index() {
  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_100Thin_Italic,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Redirect href="/wellcome" />;
}
