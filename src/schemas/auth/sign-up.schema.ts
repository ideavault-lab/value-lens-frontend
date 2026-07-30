// schemas/sign-up.schema.ts

import { z } from "zod";

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, "First name is required")
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name is too long"),

        lastName: z
            .string()
            .trim()
            .min(1, "Last name is required")
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name is too long"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Please enter a valid email address")
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),

      acceptTerms: z
  .boolean()
  .refine(Boolean, {
    message: "You must accept the Terms & Privacy Policy",
  }),

    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpDefaultValues: SignUpSchema = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
};