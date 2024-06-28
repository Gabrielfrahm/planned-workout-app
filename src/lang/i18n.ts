import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import br from "./br.json";
import { MMKVStorage } from "@/store/mmkv.store";

const resources = {
  en: en,
  br: br,
};

const langMMKV = MMKVStorage.getString("lang");

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: langMMKV ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default { i18n };
