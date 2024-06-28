import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { RefreshCcwDot } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import ChangeLang from "@/components/Lang";
import Planning from "@/styles/svgs/planning.svg";
import Man from "@/styles/svgs/man-gym.svg";
import NetworkOff from "@/styles/svgs/network-off.svg";
import { useRef, useState } from "react";
import { Link } from "expo-router";
import { useConfigStore } from "@/store/config.store";

export default function Welcome() {
  const { t } = useTranslation();
  const setPassToBegging = useConfigStore((state) => state.setPassToBegging);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: "1",
      text: t("welcome.step1.text"),
      icon: <Planning width={120} height={120} />,
      icon2: <Man width={120} height={120} />,
      textNextStep: t("welcome.step1.textNextStep"),
    },
    {
      id: "2",
      text: t("welcome.step2.text"),
      icon: <RefreshCcwDot size={120} color="#1D731A" />,
      icon2: <NetworkOff width={120} height={120} />,
      textNextStep: t("welcome.step2.textNextStep"),
      textPrevStep: t("welcome.step2.textPrevStep"),
    },
  ];

  const scrollToNext = (prev?: string) => {
    if (prev) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex - 1,
          animated: true,
        });
        setCurrentIndex(currentIndex - 1);
      }
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <ChangeLang />
      <FlatList
        data={[...slides, { id: "footer" }]}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => {
          if (item.id === "footer") {
            return (
              <View className="flex-1 w-[412] bg-grey justify-center items-center">
                <Link replace href="/signIn" asChild>
                  <Button
                    label={t("welcome.step3.buttonText")}
                    className="min-w-80"
                    onPress={() => setPassToBegging(true)}
                  />
                </Link>
              </View>
            );
          }
          return (
            <View className="flex-1 w-[412] bg-black justify-center items-center gap-10">
              <Text className="text-white text-2xl font-roboto-normal-italic text-justify pl-10 pr-10">
                {item.text}
              </Text>
              <View className="flex-row w-full p-2 justify-around">
                {item.icon}
                {item.icon2}
              </View>
              <View className="flex-row w-full justify-around absolute bottom-40">
                {index !== 0 && (
                  <TouchableOpacity onPress={() => scrollToNext("prev")}>
                    <Text className="text-green text-xl">
                      {item.textPrevStep}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => scrollToNext()}>
                  <Text className="text-dark-green text-xl">
                    {item.textNextStep}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </>
  );
}
