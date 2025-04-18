import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "6dac270d0346fe60b5c914ad0873ff8905920c9e751bdca6a5f2aebc7028ede1fbeab003c3e8735092b589410b05477ba22a36eabc7c95bec1358cee62275d7b"

export async function signJwtToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(JWT_SECRET))

    return token
  } catch (error) {
    console.error("Error signing JWT token:", error)
    throw error
  }
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    console.log("Verified JWT payload:", JSON.stringify(payload))
    return payload
  } catch (error) {
    console.error("Error verifying JWT token:", error)
    return null
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    console.log("No auth-token cookie found")
    return null
  }

  try {
    const payload = await verifyJwtToken(token)
    return payload
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    console.log("No auth-token cookie found in request")
    return null
  }

  try {
    const payload = await verifyJwtToken(token)
    return payload
  } catch (error) {
    console.error("Error updating session:", error)
    return null
  }
}
