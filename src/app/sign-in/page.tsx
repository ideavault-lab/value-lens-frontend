import AuthWrapper from "@/modules/auth/components/AuthWrapper";
import { SignInContent } from "@/modules/auth/components/SignInContent";


export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{
    redirect?: string;
  }>;
}) {

  const params = await searchParams;

  return (
    <AuthWrapper>
      <SignInContent 
        redirect={params.redirect ?? "/"}
      />
    </AuthWrapper>
  );
}