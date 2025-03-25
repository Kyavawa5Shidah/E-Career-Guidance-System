"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bot, Home, User, BarChart, BookOpen, Briefcase } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function MainNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: <Home className="h-4 w-4 mr-2" />,
      auth: false,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: <BarChart className="h-4 w-4 mr-2" />,
      auth: true,
    },
    {
      href: "/assessment",
      label: "Assessments",
      active: pathname === "/assessment",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      auth: true,
    },
    {
      href: "/jobs",
      label: "Jobs",
      active: pathname === "/jobs",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      auth: true,
    },
    {
      href: "/ai-advisor",
      label: "AI Advisor",
      active: pathname === "/ai-advisor",
      icon: <Bot className="h-4 w-4 mr-2" />,
      auth: true,
      highlight: true,
    },
    {
      href: "/profile",
      label: "Profile",
      active: pathname === "/profile",
      icon: <User className="h-4 w-4 mr-2" />,
      auth: true,
    },
  ]

  // Filter routes based on authentication status
  const filteredRoutes = routes.filter((route) => !route.auth || isAuthenticated)

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      <Link href="/" className="hidden md:block text-xl font-bold">
        ECGS
      </Link>
      <div className="flex md:ml-4">
        {filteredRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary h-9 px-2 rounded-md",
              route.active ? "text-primary bg-primary/10" : "text-muted-foreground",
              route.highlight && "relative",
            )}
          >
            {route.icon}
            <span className="hidden md:inline">{route.label}</span>
            {route.highlight && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

