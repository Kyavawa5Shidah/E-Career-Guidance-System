"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would verify the token with your backend
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        role: "user",
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      // Also set a token in localStorage and cookie for middleware to detect
      const token = "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      localStorage.setItem("token", token)
      document.cookie = `token=${token}; path=/; max-age=86400`

      // Check if user has completed onboarding
      const userProfile = localStorage.getItem("userProfile")

      if (userProfile) {
        const profile = JSON.parse(userProfile)

        if (profile.profileCompleted) {
          // User has completed onboarding, redirect to dashboard
          document.cookie = `profileCompleted=true; path=/; max-age=86400`
          window.location.href = "/dashboard"
        } else {
          // User has not completed onboarding, redirect to onboarding
          document.cookie = `profileCompleted=false; path=/; max-age=86400`
          window.location.href = "/onboarding"
        }
      } else {
        // No profile found, this is first login, redirect to onboarding
        document.cookie = `profileCompleted=false; path=/; max-age=86400`
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
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    document.cookie = "token=; path=/; max-age=0"
    document.cookie = "profileCompleted=; path=/; max-age=0"
    setUser(null)
    router.push("/login")
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "user",
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      // Redirect to onboarding for new users
      router.push("/onboarding")
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

