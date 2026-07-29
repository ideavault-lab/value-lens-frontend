export function SignInContent() {

  // const router = useRouter();
  // const params = useSearchParams();
  // const redirectTo = params.get("redirect") || "/";

  // async function handleSubmit(formData: FormData) {
  //   // call your sign-in / sign-up API here
  //   const res = await fetch(`/api/auth/${mode}`, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (res.ok) router.push(redirectTo);
  // }


  return (
    <>
      {/* Sign in content */}

      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">

            {/* Header */}

            <div className="mb-7 text-center">
              <h1 className="font-heading text-2xl font-semibold text-card-foreground">
                Sign in
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Welcome back. Enter your details to continue.
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

            <form className="space-y-4">

              <input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95"
              >
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-semibold text-primary hover:underline"
              >
                Sign up
              </a>
            </p>

          </div>
        </div>
      </main>
    </>
  )
}