import { Button } from "@/components/Button";
import InputWithIcon from "@/components/Input-with-icons";
import Load from "@/components/Load";
import { ListWorkoutsResponse } from "@/service/workout/workout.dto";
import { WorkoutService } from "@/service/workout/workout.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { BicepsFlexed, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";

export default function Index() {
  const [workouts, setWorkouts] = useState<ListWorkoutsResponse>(
    {} as ListWorkoutsResponse,
  );
  const [perPage, setPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const fetchInitialWorkouts = async () => {
      try {
        setIsLoading(true);
        const initialWorkouts = await WorkoutService().search();
        setWorkouts(initialWorkouts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch initial workouts:", error);
      }
    };

    fetchInitialWorkouts();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      try {
        setIsLoading(true);
        const work = await WorkoutService().search({
          name: nameValue,
          perPage: perPage,
        });
        setWorkouts(work);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to search workouts:", error);
      }
    };

    performSearch();
  }, [nameValue, perPage]);

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
        className="max-h-[500] w-full"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // keyboardDismissMode="on-drag"
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          console.log("um", layoutMeasurement.height + contentOffset.y);
          console.log("dois", contentSize.height - 100);
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 100
          ) {
            setIsLoading(true);
            setPerPage(perPage + 5);
            setIsLoading(false);
          }
        }}
        scrollEventThrottle={400}
      >
        {workouts.data?.map((workout) => (
          <View
            key={workout.id}
            className="flex-row mb-8 items-center w-300 h-24 border-2 border-black rounded-[10]"
            onTouchEnd={() => console.log("entrou")}
          >
            <View className="w-20 items-center">
              <BicepsFlexed size={30} color={"white"} />
            </View>
            <Text className="font-roboto-bold text-xl text-white ml-6">
              {workout.name}
            </Text>
          </View>
        ))}
        {isLoading && <Load size="large" />}
      </ScrollView>
    </View>
  );
}
