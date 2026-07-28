import {LogoBanner} from "@/modules/auth/components/LogoBanner";
import { SignInContent } from "@/modules/auth/components/SignInContent";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background px-6 py-4 lg:px-8">
      {/* Logo */}
      <header className="flex justify-center">
        <LogoBanner />
      </header>

      {/* Sign-in Content */}
      <SignInContent />

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