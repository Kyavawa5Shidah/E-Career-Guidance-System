import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";


// API route to verify the JWT token
export async function GET(request: Request) {
  try {
    // Get token from cookies (you can also get it from headers or request body)
    const token = request.headers.get("Authorization")?.replace("Bearer ", "") || "";

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "6dac270d0346fe60b5c914ad0873ff8905920c9e751bdca6a5f2aebc7028ede1fbeab003c3e8735092b589410b05477ba22a36eabc7c95bec1358cee62275d7b");

    // If decoded, return a success message with user info
    return NextResponse.json({ message: "Token is valid", decoded });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
