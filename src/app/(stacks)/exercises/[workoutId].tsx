import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import InputWithIcon from "@/components/Input-with-icons";
import Load from "@/components/Load";
import ModalComponent from "@/components/Modal";
import { AppError } from "@/lib/error.type";
import { checkInternetConnectivity } from "@/lib/network";
import { GetExercisesByWorkoutIdResponse } from "@/service/workout/workout.dto";
import { WorkoutService } from "@/service/workout/workout.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { Edit2Icon, Search, Trash2Icon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

export default function WorkoutExercise() {
  const { t } = useTranslation();
  const { workoutId } = useLocalSearchParams();
  const [exercises, setExercises] = useState<GetExercisesByWorkoutIdResponse>(
    {} as GetExercisesByWorkoutIdResponse,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formSchemaRegisterNewWorkout = z.object({
    nameExercise: z.string().refine((data) => data.trim() !== "", {
      message: t("exercises.input.error.nameExercise"),
    }),
    sets: z.number(),
    reps: z.number(),
    restTime: z.string(),
    techniques: z.string(),
  });

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      nameExercise: "",
      sets: "",
      reps: "",
      restTime: "",
      techniques: "",
    },
    resolver: zodResolver(formSchemaRegisterNewWorkout),
  });

  const nameValue = watch("name");

  const fetchInitialExercises = useCallback(async () => {
    const isNet = await checkInternetConnectivity();
    try {
      setIsLoading(true);
      const initialExercises = await WorkoutService(!isNet).getExercises({
        workoutId: workoutId as string,
      });
      setExercises(initialExercises);
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

  useEffect(() => {
    const performSearch = async () => {
      const isNet = await checkInternetConnectivity();

      try {
        setIsLoading(true);
        const exercises = await WorkoutService(!isNet).getExercises({
          workoutId: workoutId as string,
          params: {
            params: {
              name: nameValue,
              perPage: perPage,
              sortDir: "asc",
            },
          },
        });
        setExercises(exercises);
        setIsLoading(false);
      } catch (error) {
        const err = error as AppError;
        Toast.show({
          type: "error",
          text1: err.message,
        });
        setIsLoading(false);
      }
    };

    performSearch();
  }, [nameValue, perPage, workoutId]);

  return (
    <View className={`flex-1 justify-center bg-grey `}>
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
      <Modal
        transparent={true}
        visible={isModalOpen}
        animationType="fade"
        hardwareAccelerated={true}
        statusBarTranslucent={true}
      >
        <View className="flex-1 justify-center items-center ">
          <View className="bg-black w-[400] flex-row justify-between p-4 rounded-t-lg">
            <Text className="text-dark-green font-roboto-bold text-lg">
              dale
            </Text>

            <TouchableOpacity onPress={() => setIsModalOpen(false)}>
              <Text className="text-white font-roboto-bold text-xl">X</Text>
            </TouchableOpacity>
          </View>
          <View className="w-[400] bg-black p-6">
            <Controller
              control={control}
              name={"nameExercise"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="text-white font-roboto-bold-italic text-md mb-2">
                    {t("exercises.modal.label.name")}
                  </Text>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-grey rounded-md"
                  />
                  {error && (
                    <Text className="font-roboto-light-italic text-error">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <View className="flex-row justify-between items-center gap-4 mt-4">
              <Controller
                control={control}
                name={"sets"}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View className="w-[100]">
                    <Text className="text-white font-roboto-bold-italic text-md mb-2">
                      {t("exercises.modal.label.sets")}
                    </Text>
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      className="bg-grey rounded-md"
                    />
                    {error && (
                      <Text className="font-roboto-light-italic text-error">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name={"reps"}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View className="w-[100]">
                    <Text className="text-white font-roboto-bold-italic text-md mb-2">
                      {t("exercises.modal.label.reps")}
                    </Text>
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      className="bg-grey rounded-md"
                    />
                    {error && (
                      <Text className="font-roboto-light-italic text-error">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name={"restTime"}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View className="w-[100]">
                    <Text className="text-white font-roboto-bold-italic text-md mb-2">
                      {t("exercises.modal.label.restTime")}
                    </Text>
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      className="bg-grey rounded-md"
                    />
                    {error && (
                      <Text className="font-roboto-light-italic text-error">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
            <Controller
              control={control}
              name={"techniques"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View className="w-full mt-4">
                  <Text className="text-white font-roboto-bold-italic text-md mb-2">
                    {t("exercises.modal.label.techniques")}
                  </Text>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="bg-grey rounded-md"
                    multiline
                    numberOfLines={10}
                  />
                  {error && (
                    <Text className="font-roboto-light-italic text-error">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
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
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 200
          ) {
            setIsLoading(true);
            setPerPage(perPage + 5);
            setIsLoading(false);
          }
        }}
        scrollEventThrottle={300}
      >
        {exercises.data?.map((exercise) => (
          <View
            key={exercise.id}
            className="flex mb-4  w-300 h-32 bg-black rounded-[10]"
            onTouchEnd={() => setIsModalOpen(true)}
          >
            <View className="flex-row absolute right-0 top-2 w-14 justify-around items-center ">
              <Edit2Icon size={16} color={"white"} />
              <Trash2Icon size={16} color={"white"} />
            </View>
            <Text className="font-roboto-bold text-sm text-white ml-6 mt-4">
              <Text className="text-dark-green">
                {t("exercises.workoutId.name")}:{" "}
              </Text>
              {exercise.name}
            </Text>
            <View className="flex-row">
              <Text className="font-roboto-bold text-sm text-white ml-6 mt-4">
                <Text className="text-dark-green">
                  {t("exercises.workoutId.sets")}:{" "}
                </Text>
                {exercise.sets}
              </Text>
              <Text className="font-roboto-bold text-sm text-white ml-6 mt-4">
                <Text className="text-dark-green">
                  {t("exercises.workoutId.reps")}:{" "}
                </Text>
                {exercise.reps}
              </Text>
              <Text className="font-roboto-bold text-sm text-white ml-6 mt-4">
                <Text className="text-dark-green">
                  {t("exercises.workoutId.restTime")}:{" "}
                </Text>
                {exercise.restTime}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              className="font-roboto-bold text-sm text-white ml-6 mt-4"
            >
              {exercise.techniques}
            </Text>
          </View>
        ))}
        {isLoading && <Load size="large" />}
      </ScrollView>
    </View>
  );
}
