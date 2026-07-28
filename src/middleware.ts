// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

const PROTECTED_ROUTES = ["/valuation"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
const token = req.cookies.get("next-auth.session-token")?.value;
  const isAuthed = !!token;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // 1. Block protected routes for unauthenticated users
  if (isProtected && !isAuthed) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Keep authenticated users off sign-in/sign-up
  if (isAuthRoute && isAuthed) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Only run middleware where it's actually needed — cheaper + avoids
// accidentally blocking static assets or API routes.
export const config = {
  matcher: ["/valuation/:path*", "/sign-in", "/sign-up"],
};