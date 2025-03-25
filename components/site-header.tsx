"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Bot } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function SiteHeader() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex items-center space-x-1 md:ml-auto">
          {isAuthenticated && (
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/ai-advisor" className="flex items-center gap-1">
                <Bot className="h-4 w-4 text-primary" />
                <span className="hidden md:inline">AI Advisor</span>
              </Link>
            </Button>
          )}
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

