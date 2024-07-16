import { Button } from "@/components/Button";
import { AppError } from "@/lib/error.type";
import { checkInternetConnectivity } from "@/lib/network";
import { WorkoutService } from "@/service/workout/workout.service";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function WorkoutExercise() {
  const { workoutId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchInitialExercises = useCallback(async () => {
    const isNet = await checkInternetConnectivity();
    try {
      setIsLoading(true);
      const initialExercises = await WorkoutService(!isNet).getExercises({
        workoutId: workoutId as string,
      });
      console.log(initialExercises);
      setIsLoading(false);
    } catch (error) {
      const err = error as AppError;
      Toast.show({
        type: "error",
        text1: err.message,
      });
      setIsLoading(false);
    }
  }, [workoutId]);

  useEffect(() => {
    fetchInitialExercises();
  }, [fetchInitialExercises]);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text>{workoutId}</Text>
      <Button label="Voltar" onPressOut={() => router.back()} />
    </View>
  );
}
