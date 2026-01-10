import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: We cannot use auth() in middleware because it runs on Edge Runtime
// Instead, we'll check for the session token cookie
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Check if session token exists
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      // Not authenticated, redirect to login
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Note: We can't check the user role here in Edge Runtime
    // Role checking should be done in the page component using useSession
    // or in API routes using auth()
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    // Add other protected routes here as needed
  ],
};
