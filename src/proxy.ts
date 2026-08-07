import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PROTECTED_ROUTES = ["/valuation"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];


export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;


  const token = req.cookies.get("accessToken")?.value;
  const isAuthed = Boolean(token);


  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );


  // Block private pages
  if (isProtected && !isAuthed) {
    const signInUrl = new URL("/sign-in", req.url);

    signInUrl.searchParams.set(
      "redirect",
      pathname + search
    );

    return NextResponse.redirect(signInUrl);
  }


  // Prevent logged users from opening auth pages
  if (isAuthRoute && isAuthed) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/valuation/:path*",
    "/sign-in",
    "/sign-up",
  ],
};