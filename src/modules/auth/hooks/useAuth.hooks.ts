import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth.api";


export function useSignUp() {
  return useMutation({
    mutationKey: ["auth", "sign-up"],

    mutationFn: signUp,
  });
}