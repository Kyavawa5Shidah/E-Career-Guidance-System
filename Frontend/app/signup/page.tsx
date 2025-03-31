import { redirect } from "next/navigation"

// Redirect /signup to /auth/register
export default function SignupRedirect() {
  redirect("/auth/register")
}

