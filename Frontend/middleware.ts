import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // Check if the user is authenticated
  const isAuthenticated = !!token

  // Check if user has completed onboarding
  const hasCompletedOnboarding = request.cookies.get("profileCompleted")?.value === "true"

  // For debugging - log the authentication state
  console.log({
    path,
    isPublicPath,
    isAuthenticated,
    hasCompletedOnboarding,
    token: token ? "exists" : "missing",
  })

  // Redirect logic
  if (isPublicPath && isAuthenticated) {
    // If user is authenticated and trying to access public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !isAuthenticated && path !== "/onboarding") {
    // If user is not authenticated and trying to access protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && path === "/dashboard" && !hasCompletedOnboarding) {
    // If user is authenticated but hasn't completed onboarding, redirect to onboarding
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  // Allow access to onboarding page even if authenticated
  if (path === "/onboarding" && isAuthenticated) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/onboarding",
    "/jobs/:path*",
    "/career/:path*",
  ],
}

