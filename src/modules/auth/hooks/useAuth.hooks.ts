import { useMutation , useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout, signIn, signUp } from "../services/auth.api";


export function useSignUp() {
  return useMutation({
    mutationKey: ["auth", "sign-up"],

    mutationFn: signUp,
  });
}

export function useSignIn() {
  return useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: signIn,
  });
}



export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "current-user"],

    queryFn: async () => {
      try {
        const response =
          await getCurrentUser();

          console.log("Current User Response:", response);
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "logout"],

    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(
        ["auth", "current-user"],
        null
      );

      queryClient.invalidateQueries({
        queryKey: ["auth", "current-user"],
      });
    },
  });
}