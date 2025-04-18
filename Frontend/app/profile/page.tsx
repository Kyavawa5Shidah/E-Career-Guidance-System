"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react"

type ProfileData = {
  id: number
  userId: string
  age: number
  gender: string
  educationLevel: string
  experience: string
  careerPreferences: string
  skills: string[]
  interests: string[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("")

  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile")

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setProfile(data.profile)

        // Fetch user info to get name
        const userResponse = await fetch("/api/user")
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUserName(userData.name || "")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="container py-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <p className="text-red-500">{error || "Profile not found"}</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/profile/setup")}>
              Create Profile
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Format education level for display
  const formatEducation = (level: string) => {
    return level.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="container py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Resume Header */}
        <div className="bg-slate-800 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{userName || "Your Profile"}</h1>
              <p className="text-slate-300 mt-2">
                {profile.gender === "prefer-not-to-say" ? "" : profile.gender}
                {profile.gender && profile.age ? " • " : ""}
                {profile.age ? `${profile.age} years old` : ""}
              </p>

              {/* Contact Info Placeholder - Replace with actual data when available */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>email@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>City, Country</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-slate-700"
                onClick={() => router.push("/profile/edit")}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-slate-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Career Objective */}
            {profile.careerPreferences && (
              <section>
                <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-slate-600" />
                  Career Objective
                </h2>
                <p className="text-slate-700 whitespace-pre-line">{profile.careerPreferences}</p>
              </section>
            )}

            {/* Experience */}
            {profile.experience && (
              <section>
                <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-slate-600" />
                  Professional Experience
                </h2>
                <p className="text-slate-700 whitespace-pre-line">{profile.experience}</p>
              </section>
            )}

            {/* Education */}
            {profile.educationLevel && (
              <section>
                <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-slate-600" />
                  Education
                </h2>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{formatEducation(profile.educationLevel)}</h3>
                  <p className="text-slate-600">University/Institution Name</p>
                  <p className="text-slate-500">Graduation Year</p>
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-slate-600" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-800 hover:bg-slate-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <section>
                <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="border-slate-300 text-slate-700">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Languages - Placeholder */}
            <section>
              <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4">Languages</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>English</span>
                  <span className="text-slate-600">Native</span>
                </li>
                <li className="flex justify-between">
                  <span>Spanish</span>
                  <span className="text-slate-600">Intermediate</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
