import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import type { RowDataPacket } from "mysql2"

// GET user profile
export async function GET() {
  try {
    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key")

    if (typeof decoded !== "object" || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user profile
    const profiles = (await query(
      `SELECT up.*, u.first_name, u.last_name, u.email 
       FROM user_profiles up
       JOIN users u ON up.user_id = u.id
       WHERE up.user_id = ?`,
      [decoded.userId],
    )) as RowDataPacket[]

    if (!Array.isArray(profiles) || profiles.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get user preferences
    const preferences = (await query("SELECT * FROM user_preferences WHERE user_id = ?", [
      decoded.userId,
    ])) as RowDataPacket[]

    const profile = profiles[0]
    profile.preferences = preferences.length > 0 ? preferences[0] : {}

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

// UPDATE user profile
export async function PUT(request: Request) {
  try {
    // Get token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key")

    if (typeof decoded !== "object" || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.userId
    const { bio, location, education, experience, preferences, profileCompleted } = await request.json()

    // Update user profile
    await query(
      `UPDATE user_profiles SET 
       bio = ?, location = ?, education = ?, 
       experience = ?, profile_completed = ?
       WHERE user_id = ?`,
      [bio, location, JSON.stringify(education), JSON.stringify(experience), profileCompleted, userId],
    )

    // Check if preferences exist
    const existingPrefs = (await query("SELECT * FROM user_preferences WHERE user_id = ?", [userId])) as RowDataPacket[]

    if (Array.isArray(existingPrefs) && existingPrefs.length > 0) {
      // Update preferences
      await query(
        `UPDATE user_preferences SET 
         interests = ?, skills = ?, work_style = ?, 
         values_list = ?, salary_importance = ?, 
         work_life_balance = ?, growth_potential = ?,
         personality_traits = ?
         WHERE user_id = ?`,
        [
          JSON.stringify(preferences.interests),
          JSON.stringify(preferences.skills),
          preferences.workStyle,
          JSON.stringify(preferences.values),
          preferences.salaryImportance,
          preferences.workLifeBalance,
          preferences.growthPotential,
          JSON.stringify(preferences.personalityTraits),
          userId,
        ],
      )
    } else {
      // Insert preferences
      await query(
        `INSERT INTO user_preferences 
         (user_id, interests, skills, work_style, values_list, 
          salary_importance, work_life_balance, growth_potential, personality_traits)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          JSON.stringify(preferences.interests),
          JSON.stringify(preferences.skills),
          preferences.workStyle,
          JSON.stringify(preferences.values),
          preferences.salaryImportance,
          preferences.workLifeBalance,
          preferences.growthPotential,
          JSON.stringify(preferences.personalityTraits),
        ],
      )
    }

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

