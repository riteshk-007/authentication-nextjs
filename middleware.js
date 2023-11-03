import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const AuthToken = cookies().get("token")?.value;

  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/signup"
  ) {
    return null;
  }

  const loggedInUserNotAccessPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (loggedInUserNotAccessPath) {
    // if user is logged in, redirect to home page
    if (AuthToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } else {
    // if user is not logged in, redirect to login page
    if (!AuthToken) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          { error: "You are not authorized" },
          { status: 401 }
        );
      }
      return AuthToken
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/login", "/signup", "/api/:path*"],
};
