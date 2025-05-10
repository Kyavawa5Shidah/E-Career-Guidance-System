import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signJwtToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // Generate a unique ID
        email,
        password: hashedPassword,
        name,
      },
    })

    // Create JWT token
    const token = await signJwtToken({
      id: user.id,
      email: user.email,
      name: user.name,
      hasProfile: false,
    })

    // Create response
    const response = NextResponse.json({ success: true }, { status: 201 })

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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
