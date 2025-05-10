import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/nav-bar"
import  PublicHeader  from "@/components/public-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Education & Career Guidance System",
  description: "A platform for career guidance and educational planning",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
            {true ? <Navbar /> : <PublicHeader />}
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

