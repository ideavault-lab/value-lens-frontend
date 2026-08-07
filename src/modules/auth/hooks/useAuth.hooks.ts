import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../services/auth.api";


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