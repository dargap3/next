import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Custom matcher config
/* export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/route-handlers/profile",
}; */

// Conditional statements
/* export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/route-handlers/profile") {
    return NextResponse.redirect(
      new URL("/route-handlers/hello", request.nextUrl)
    );
  }
} */

// Cookies and headers
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark");
  }

  response.headers.set("custom-header", "custom-value");

  return response;
}
