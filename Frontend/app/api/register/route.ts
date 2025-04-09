import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";
import { hashPassword } from "@/lib/passwordutils";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    console.log("Received data:", { firstName, lastName, email, password });
    // Basic validation: Check if all fields are provided
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields (firstName, lastName, email, password) are required" },
        { status: 400 }
      );
    }
    
    // Trim the input to avoid submitting spaces as values
    if (firstName.trim() === '' || lastName.trim() === '') {
      return NextResponse.json(
        { error: "First name and last name cannot be empty" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user
    const result = (await query(
      "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, 'user']
    )) as ResultSetHeader;

    // Create empty profile for the user
    await query("INSERT INTO user_profiles (user_id, profile_completed) VALUES (?, ?)", [result.insertId, false]);

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to register user";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
