import { Redirect } from "expo-router";
import "@/lang/i18n";

export default function Index() {
  return <Redirect href="/signIn" />;
}
