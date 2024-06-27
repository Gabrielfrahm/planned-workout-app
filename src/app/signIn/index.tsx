import { Text, View } from "react-native";

import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-dark-green">{t("signIn.title")}</Text>
    </View>
  );
}
