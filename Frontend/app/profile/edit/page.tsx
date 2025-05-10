"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ProfileData = {
  name: string
  age: number
  gender: string
  educationLevel: string
  experience: string
  careerPreferences: string
  skills: string[]
  interests: string[]
}

export default function EditProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [name, setName] = useState("")
  const [age, setAge] = useState<number | undefined>(undefined)
  const [gender, setGender] = useState("")
  const [educationLevel, setEducationLevel] = useState("")
  const [experience, setExperience] = useState("")
  const [careerPreferences, setCareerPreferences] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [interestInput, setInterestInput] = useState("")
  const [interests, setInterests] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile")

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        const profileData = data.profile

        setProfile(profileData)
        setName(profileData.name || "")
        setAge(profileData.age || undefined)
        setGender(profileData.gender || "")
        setEducationLevel(profileData.educationLevel || "")
        setExperience(profileData.experience || "")
        setCareerPreferences(profileData.careerPreferences || "")
        setSkills(profileData.skills || [])
        setInterests(profileData.interests || [])
      } catch (error) {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()])
      setInterestInput("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          educationLevel,
          experience,
          careerPreferences,
          skills,
          interests,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save profile")
      }

      router.push("/profile")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-10">
        <Card>
          <CardContent className="p-10">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age === undefined ? "" : age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD or Doctorate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Professional Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your work experience..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerPreferences">Career Preferences</Label>
                <Textarea
                  id="careerPreferences"
                  placeholder="What are your career goals and preferences?"
                  value={careerPreferences}
                  onChange={(e) => setCareerPreferences(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <div className="flex gap-2">
                  <Input
                    id="interests"
                    placeholder="Add an interest"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addInterest()
                      }
                    }}
                  />
                  <Button type="button" onClick={addInterest}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {interest}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeInterest(interest)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
