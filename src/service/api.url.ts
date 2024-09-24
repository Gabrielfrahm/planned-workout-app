export const ApiUrls = {
  auth: {
    authentications: (): string => `auth`,
    authGoogle: (): string => `auth/google`,
  },
  user: {
    registerUser: (): string => `users`,
  },
  workout: {
    search: (): string => `workouts/search/workouts`,
    register: (): string => `workouts/`,
    getExercises: (workoutId: string): string =>
      `exercises/search/${workoutId}`,
  },
};
