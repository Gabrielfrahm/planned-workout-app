import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Text, View } from "react-native";
import { useConfigStore } from "@/store/config.store";

import { useEffect } from "react";
import i18next from "i18next";

export default function ChangeLang() {
  const { t } = useTranslation();
  const lang = useConfigStore((state) => state.lang);
  const setLang = useConfigStore((state) => state.setLang);

  useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  return (
    <View className="w-full justify-center items-center absolute z-10 top-10">
      <Text className="text-white  mb-5 font-roboto-light-italic text-xl ">
        {t("ChangeComponentTranslation.title")}
      </Text>
      <View className="flex-row w-80 justify-around ">
        <Button label="EN" size="default" onPress={() => setLang("en")} />
        <Button label="PT" size="default" onPress={() => setLang("br")} />
      </View>
    </View>
  );
}
