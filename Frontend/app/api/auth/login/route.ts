import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import  { prisma } from "@/lib/prisma"
import { signJwtToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user has a profile
    const hasProfile = !!user.profile

    console.log(`User ${user.id} has profile: ${hasProfile}`)

    // Create JWT token
    const token = await signJwtToken({
      id: user.id,
      email: user.email,
      name: user.name,
      hasProfile,
    })

    // Create response
    const response = NextResponse.json({ success: true }, { status: 200 })

    // Set cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
