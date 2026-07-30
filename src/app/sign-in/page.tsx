import AuthWrapper from "@/modules/auth/components/AuthWrapper";
import { SignInContent } from "@/modules/auth/components/SignInContent";

export default function SignInPage() {
  return (
   <AuthWrapper>
      <SignInContent />
    </AuthWrapper>
  );
}