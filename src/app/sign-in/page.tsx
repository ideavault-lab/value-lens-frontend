"use client";

import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 py-4 lg:px-8">
      {/* Logo */}
      <header className="flex justify-center">
        <div className="flex items-center gap-2">
          {/* <div className="h-8 w-8 rounded-md bg-slate-900 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">N</span>
          </div> */}
          <Image
            src="/value-lens.png"
            alt="Company Logo"
            width={56}
            height={56}
          />
          {/* <span className="text-slate-900 font-semibold tracking-tight">
            name org
          </span> */}
        </div>
      </header>

      {/* Center content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="bg-popover  border-slate-200 rounded-xl shadow-sm px-8 py-9">
            <div className="mb-7 text-center">
              <h1 className="text-xl font-semibold text-popover-foreground">
                Sign in
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Welcome back. Enter your details to continue.
              </p>
            </div>

            {/* Google auth */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                  d="M5.31 14.34A7.2 7.2 0 0 1 4.93 12c0-.81.14-1.6.38-2.34V6.59H1.3A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.3 5.41l4.01-3.07z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.3 6.59l4.01 3.07C6.25 6.85 8.89 4.75 12 4.75z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Manual login */}
            <form className="space-y-3.5">
              <input
                id="email"
                type="email"
                aria-label="Email"
                placeholder="name@company.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />

              <input
                id="password"
                type="password"
                aria-label="Password"
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors mt-1"
              >
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-popover-foreground hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p className="text-center text-xs text-slate-400">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-slate-600">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-slate-600">
            Privacy Policy
          </a>
          .
        </p>
      </footer>
    </div>
  );
}