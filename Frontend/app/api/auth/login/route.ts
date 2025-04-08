import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";

// Login route
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if the user exists by email
    const users = (await query("SELECT * FROM users WHERE email = ?", [email])) as RowDataPacket[];

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the user from the query result (since it's an array, get the first item)
    const user = users[0];

    // Compare the hashed password from the database with the provided password
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET || "6dac270d0346fe60b5c914ad0873ff8905920c9e751bdca6a5f2aebc7028ede1fbeab003c3e8735092b589410b05477ba22a36eabc7c95bec1358cee62275d7b", {
      expiresIn: "1h", // Token expiration time (optional)
    });

    // Respond with the JWT token
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
