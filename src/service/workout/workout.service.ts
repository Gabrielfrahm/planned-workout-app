import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import {
  GetExercisesByWorkoutIdCommand,
  ListWorkoutsResponse,
  RegisterANewWorkout,
} from "./workout.dto";

async function searchWorkout(params?: any) {
  try {
    const response = await api.get<ListWorkoutsResponse>(
      ApiUrls.workout.search(),
      {
        params: params,
      },
    );

    return response.data;
  } catch (e) {
    const err = e as {
      message: string;
    };

    if (err.message.includes("Network Error")) {
      throw new Error("list workouts only in online");
    }
    throw err;
  }
}

async function registerNewWorkout(data: RegisterANewWorkout) {
  try {
    const response = await api.post<ListWorkoutsResponse>(
      ApiUrls.workout.register(),
      data,
    );

    return response.data;
  } catch (e) {
    const err = e as {
      message: string;
    };

    if (err.message.includes("Network Error")) {
      throw new Error("register a new workouts only in online");
    }
    throw err;
  }
}

async function getExercisesByWorkoutId(data: GetExercisesByWorkoutIdCommand) {
  try {
    const response = await api.get<ListWorkoutsResponse>(
      ApiUrls.workout.getExercises(data.workoutId),
    );

    return response.data;
  } catch (e) {
    const err = e as {
      message: string;
    };

    if (err.message.includes("Network Error")) {
      throw new Error("get exercises workouts only in online");
    }
    throw err;
  }
}

export const WorkoutService = (inMemory: boolean = false) => {
  const search = async (params?: any) => {
    if (inMemory) {
      throw new Error("list workouts only in online");
    } else {
      return searchWorkout(params);
    }
  };

  const register = async (data: RegisterANewWorkout) => {
    if (inMemory) {
      throw new Error("register a new workouts only in online");
    }

    return registerNewWorkout(data);
  };

  const getExercises = async (data: GetExercisesByWorkoutIdCommand) => {
    if (inMemory) {
      throw new Error("register a new workouts only in online");
    }

    return getExercisesByWorkoutId(data);
  };
  return { search, register, getExercises };
};
