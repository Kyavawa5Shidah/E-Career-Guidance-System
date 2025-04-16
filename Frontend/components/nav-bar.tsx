"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, LogOut, User, Settings, Home, BookOpen, Briefcase, BarChart2, Bot } from "lucide-react"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-primary text-primary-foreground font-bold rounded-md p-2 mr-2">ECGS</div>
              <span className="font-semibold text-lg hidden md:block">Education & Career Guidance System</span>
            </Link>
          </div>

          {/* Desktop Navigation - Only shown when authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                href="/dashboard"
                className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              
              <Link
                href="/skill-assessment"
                className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Skill Assessment
              </Link>
              <Link
                href="/jobs"
                className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs
              </Link>
              <Link
                href="/careers"
                className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Careers
              </Link>
              <Link
                href="/ai-advisor"
                className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Advisor
              </Link>
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <ModeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile menu button - only for authenticated users */}
                <div className="md:hidden ml-2">
                  <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu - Only shown when authenticated and menu is open */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden pb-3 pt-2">
            <div className="space-y-1 px-2">
              <Link
                href="/dashboard"
                className="flex items-center text-foreground/70 hover:bg-primary/10 hover:text-foreground px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/assessment"
                className="flex items-center text-foreground/70 hover:bg-primary/10 hover:text-foreground px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Assessments
              </Link>
              <Link
                href="/careers"
                className="flex items-center text-foreground/70 hover:bg-primary/10 hover:text-foreground px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Careers
              </Link>
              <Link
                href="/jobs"
                className="flex items-center text-foreground/70 hover:bg-primary/10 hover:text-foreground px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Jobs
              </Link>
              <Link
                href="/ai-advisor"
                className="flex items-center text-foreground/70 hover:bg-primary/10 hover:text-foreground px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bot className="mr-2 h-5 w-5" />
                AI Advisor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

