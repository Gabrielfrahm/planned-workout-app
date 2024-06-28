import { Text, View } from "react-native";
import Logo from "@/styles/svgs/logo.svg";
import { useTranslation } from "react-i18next";

import InputWithIcon from "@/components/Input-with-icons";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { Mail } from "lucide-react-native";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center bg-grey">
      <Logo />
      <Text className="text-white  font-roboto-bold text-2xl m-6">
        {t("signIn.title")}
      </Text>
      <InputWithIcon icon={<Mail color="#323640" />} />
      <Button label={t("signIn.button")} className="w-[200px] m-6" />
      <Link href="/signUp" className="flex-row ">
        <Text className="text-white font-roboto-bold text-base">
          {t("signIn.link.text")}
        </Text>
        <Text className="text-green font-roboto-bold-italic text-base">
          {" "}
          {t("signIn.link.text2")}
        </Text>
      </Link>
    </View>
  );
}
