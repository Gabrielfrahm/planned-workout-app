import api from "@/lib/api";
import { ApiUrls } from "../api.url";

async function searchWorkout(params?: any) {
  try {
    const response = await api.get(ApiUrls.workout.search());

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
