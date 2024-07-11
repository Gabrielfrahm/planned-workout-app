import { Button } from "@/components/Button";
import InputWithIcon from "@/components/Input-with-icons";
import { WorkoutService } from "@/service/workout/workout.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { BicepsFlexed, Search } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";

export default function Index() {
  const formSchema = z.object({
    name: z.string(),
  });

  const { control, watch } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      const performSearch = async () => {
        console.log(await WorkoutService().search());
      };

      performSearch();
    }
  }, [nameValue]);

  return (
    <View className="flex-1 justify-center bg-grey">
      <View className="w-full px-4 absolute top-10 flex-row justify-around items-center h-auto">
        <Controller
          control={control}
          name={"name"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <InputWithIcon
                icon={<Search color={error?.message ? "#ff5555" : "#323640"} />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error?.message}
              />
              {error && (
                <Text className="font-roboto-light-italic text-error">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
        <Button label="+" />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="max-h-[500] w-full "
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <View
          className="flex-row mb-2 items-center w-300 h-20 border-2 border-black rounded-[10]"
          onTouchEnd={() => console.log("entrou")}
        >
          <View className="w-20 items-center">
            <BicepsFlexed size={30} color={"white"} />
          </View>
          <Text className="font-roboto-bold text-xl text-white ml-6">
            Costas e Bíceps
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
