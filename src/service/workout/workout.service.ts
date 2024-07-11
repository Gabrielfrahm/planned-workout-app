import api from "@/lib/api";
import { ApiUrls } from "../api.url";
import { ListWorkoutsResponse } from "./workout.dto";

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
      throw new Error("register user needs to be online");
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

  return { search };
};
