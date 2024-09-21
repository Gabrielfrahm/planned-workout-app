import { create } from "zustand";
import { MMKVStorage } from "./mmkv.store";
import { UserInfo } from "./user.store";

export type WorkoutInfo = {
  id: string;
  name: string;
  user: UserInfo;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

type UserStore = {
  workouts: WorkoutInfo;
  setWorkout: (workouts: WorkoutInfo) => void;
};

const workoutsMMKV = MMKVStorage.getString(`workouts`);

export const useWorkoutStore = create<UserStore>((set) => ({
  workouts: workoutsMMKV ? JSON.parse(workoutsMMKV) : ({} as WorkoutInfo),
  setWorkout: (workouts: WorkoutInfo) => {
    MMKVStorage.set(`workouts`, JSON.stringify(workouts));
    set({ workouts });
  },
}));
