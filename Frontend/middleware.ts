import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get user session
  const session = await updateSession(request)

  // Debug logging
  console.log("Middleware session:", JSON.stringify(session))
  console.log("Current path:", pathname)

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/", "/features", "/about"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  // Auth routes that require no authentication (to prevent logged in users from accessing)
  const authRoutes = ["/login", "/register", "/"]
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  // Profile setup route
  const isProfileSetupRoute = pathname === "/profile/setup" || pathname.startsWith("/profile/setup/")

  // If user is not logged in and trying to access a protected route
  if (!session && !isPublicRoute) {
    console.log("Redirecting to login: No session")
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If user is logged in but doesn't have a profile, redirect to profile setup
  // except if they're already on the profile setup page
  if (session && session.hasProfile === false && !isProfileSetupRoute && !isAuthRoute && !isPublicRoute) {
    console.log("Redirecting to profile setup: No profile")
    return NextResponse.redirect(new URL("/profile/setup", request.url))
  }

  // If user has a profile but tries to access the profile setup page
  if (session && session.hasProfile === true && isProfileSetupRoute) {
    console.log("Redirecting to profile: Already has profile")
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  // If user is logged in and trying to access auth routes
  if (session && isAuthRoute) {
    console.log("Redirecting to profile: Already authenticated")
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
