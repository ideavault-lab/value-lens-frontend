import AuthWrapper from "@/modules/auth/components/AuthWrapper";
import { SignUpContent } from "@/modules/auth/components/SignUpContent";

export default function SignUpPage() {
  return (
   <AuthWrapper>
      <SignUpContent />
    </AuthWrapper>
  );
}