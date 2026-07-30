"use client";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import { Input } from "@/components/ui/Input";
import { Link } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/schemas/auth/sign-up.schema";
import { useSignUp } from "../hooks/useAuth.hooks";

export function SignUpContent() {

    const { handleSubmit, register, control, formState: { errors , isValid } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    //API hooks
    const {mutateAsync: signUpMutation, isPending: isSigningUp} = useSignUp();

    const onSubmit = (data: SignUpSchema) => {
        console.log(data);

        signUpMutation(data);
        // mutation.mutate(data)
    };


    return (
        <main className="flex flex-1 items-center justify-center px-6 py-10">
            <div className="w-full max-w-sm">
                <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">

                    {/* Header */}

                    <div className="mb-7 text-center">
                        <h1 className="font-heading text-2xl font-semibold text-card-foreground">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Start valuing vehicles with AI in just a few seconds.
                        </p>
                    </div>

                    {/* Google */}

                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.07C3.26 21.3 7.31 24 12 24z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.31 14.34A7.2 7.2 0 014.93 12c0-.81.14-1.6.38-2.34V6.59H1.3A11.98 11.98 0 000 12c0 1.94.46 3.77 1.3 5.41l4.01-3.07z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.3 6.59l4.01 3.07C6.25 6.85 8.89 4.75 12 4.75z"
                            />
                        </svg>

                        Continue with Google
                    </button>

                    {/* Divider */}

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-medium tracking-widest text-muted-foreground">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Form */}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                placeholder="First name"
                                {...register("firstName")}
                                error={errors.firstName?.message}
                            />

                            <Input
                                placeholder="Last name"
                                {...register("lastName")}
                                error={errors.lastName?.message}
                            />
                        </div>

                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            error={errors.email?.message}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Input
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        />

                        <Controller
                            name="acceptTerms"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked)}
                                    error={errors.acceptTerms?.message}
                                    label={
                                        <span className="text-sm text-muted-foreground">
                                            By creating an account, you agree to our{" "}
                                            <a
                                                href="/terms"
                                                className="font-medium text-primary hover:underline"
                                            >
                                                Terms & Conditions
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="/privacy"
                                                className="font-medium text-primary hover:underline"
                                            >
                                                Privacy Policy
                                            </a>
                                            .
                                        </span>
                                    }
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            // loading={mutation.isPending}
                            loading={isSigningUp}
                            disabled={isSigningUp}
                            loadingText="Creating account..."
                        >
                            Create account
                        </Button>
                    </form>

                    {/* Footer */}

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <a
                            href="/sign-in"
                            className="font-semibold text-primary hover:underline"
                        >
                            Sign in
                        </a>
                    </p>

                </div>
            </div>
        </main>
    );
}