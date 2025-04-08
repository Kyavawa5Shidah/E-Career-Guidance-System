import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { ResultSetHeader } from "mysql2"
import { hashPassword } from "@/lib/passwordutils"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Check if user already exists
    const existingUsers = await query("SELECT * FROM users WHERE email = ?", [email])

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Insert user
    const result = (await query("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", [
      firstName,
      lastName,
      email,
      hashedPassword,
    ])) as ResultSetHeader

    // Create empty profile for the user
    await query("INSERT INTO user_profiles (user_id, profile_completed) VALUES (?, ?)", [result.insertId, false])

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}

