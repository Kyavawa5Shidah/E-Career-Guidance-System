"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so we can safely set mounted to true
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // To avoid hydration mismatch, only render children when mounted
  // This ensures the first client render matches the server render
  if (!mounted) {
    return (
      <NextThemesProvider {...props}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </NextThemesProvider>
    )
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}


