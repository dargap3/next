import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
/* export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark");
  }

  response.headers.set("custom-header", "custom-value");

  return response;
} */

// const isProtectedRoute = createRouteMatcher(["/authentication/user-profile"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/authentication/sign-in(.*)",
  "/authentication/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher(["/authentication/admin"]);

/* export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
}); */

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  // if (!isPublicRoute(req)) await auth.protect();
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (!userId && !isPublicRoute(req)) {
    // Same as before but we can add custom logic to run before redirecting

    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
