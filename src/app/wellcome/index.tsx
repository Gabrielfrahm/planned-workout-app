import { View, Text, FlatList } from "react-native";
import { MoveRightIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";

export default function Welcome() {
  const { t } = useTranslation();

  const slides = [
    { id: "1", text: t("welcome.step1") },
    {
      id: "2",
      text: t("welcome.step2"),
    },
  ];

  return (
    <FlatList
      data={slides}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      renderItem={({ item }) => (
        <View className={`w-[412] bg-black justify-center items-center`}>
          <Text className="text-white text-4xl font-test ">{item.text}</Text>
          <MoveRightIcon color="black" size={50} />
        </View>
      )}
      ListFooterComponent={() => (
        <View className={`flex-1 w-[412] bg-black justify-center items-center`}>
          <Button label={t("welcome.button")} />
        </View>
      )}
    />
  );
}
