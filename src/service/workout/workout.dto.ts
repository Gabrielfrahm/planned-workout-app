import { UserRegisterResponse } from "../users/user.dto";

export type ListWorkoutsResponse = {
  data: {
    id: string;
    user: UserRegisterResponse;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
};

export type RegisterANewWorkout = {
  name: string;
};

export type GetExercisesByWorkoutIdCommand = {
  workoutId: string;
  params?: any;
};

export type GetExercisesByWorkoutIdResponse = {
  data: {
    id: string;
    name: string;
    reps: number;
    restTime: string;
    sets: number;
    techniques: string;
    workoutId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
};
