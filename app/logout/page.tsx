"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LogoutPage() {
  const { logout } = useAuth()

  useEffect(() => {
    // Call the logout function from our auth context
    const performLogout = async () => {
      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 1000))
      logout()
    }

    performLogout()
  }, [logout])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-lg">Logging out...</p>
    </div>
  )
}

