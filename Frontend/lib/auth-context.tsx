"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a token in localStorage
        const token = localStorage.getItem("token")

        if (token) {
          // Verify token with the server
          const response = await fetch("/api/auth/verify")

          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("token")
            document.cookie = "token=; path=/; max-age=0"
            document.cookie = "profileCompleted=; path=/; max-age=0"
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()

      // Save token to localStorage
      localStorage.setItem("token", data.token)

      // Set token cookie for middleware
      document.cookie = `token=${data.token}; path=/; max-age=86400`

      // Set profile completed cookie
      document.cookie = `profileCompleted=${data.profileCompleted}; path=/; max-age=86400`

      // Set user data
      setUser(data.user)

      // Redirect based on profile completion
      if (data.profileCompleted) {
        window.location.href = "/dashboard"
      } else {
        window.location.href = "/onboarding"
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    document.cookie = "token=; path=/; max-age=0"
    document.cookie = "profileCompleted=; path=/; max-age=0"
    setUser(null)
    router.push("/login")
  }

  // Register function
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Registration failed")
      }

      // After registration, log the user in
      await login(email, password)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

