import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInDefaultValues: SignInSchema = {
  email: "",
  password: "",
};