"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  AtSign,
  Briefcase,
  Calendar,
  Edit,
  GraduationCap,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+256 123 456 789",
    location: "Kampala, Uganda",
    bio: "Passionate software developer with a keen interest in web technologies and AI. Looking to leverage my skills in a challenging role that offers growth opportunities.",
    education: [
      {
        id: 1,
        institution: "Makerere University",
        degree: "Bachelor of Science in Computer Science",
        year: "2018 - 2022",
      },
      {
        id: 2,
        institution: "Kampala Technical Institute",
        degree: "Diploma in Software Engineering",
        year: "2016 - 2018",
      },
    ],
    experience: [
      {
        id: 1,
        company: "Tech Solutions Ltd",
        position: "Junior Developer",
        duration: "Jan 2022 - Present",
        description:
          "Developing and maintaining web applications using React and Node.js. Collaborating with the design team to implement responsive UI components.",
      },
      {
        id: 2,
        company: "Digital Creatives",
        position: "Intern",
        duration: "Jun 2021 - Dec 2021",
        description: "Assisted in the development of client websites. Gained experience in HTML, CSS, and JavaScript.",
      },
    ],
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "MongoDB", level: 65 },
    ],
    profileCompletion: 85,
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and career details</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(false)}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm" className="mt-4">
                  Change Photo
                </Button>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground">Junior Developer</p>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground mb-1">Profile Completion</div>
                  <div className="flex items-center gap-2">
                    <Progress value={userData.profileCompletion} className="h-2 w-24" />
                    <span className="text-sm font-medium">{userData.profileCompletion}%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <AtSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{userData.location}</span>
                </div>
              </div>
              {!isEditing && <p className="mt-4 text-muted-foreground">{userData.bio}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={userData.name} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userData.email} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={userData.phone} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={userData.location} disabled={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={userData.bio} disabled={!isEditing} rows={4} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your academic background</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {userData.education.map((edu) => (
                <div key={edu.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">{edu.institution}</h3>
                      </div>
                      <p className="text-muted-foreground mt-1">{edu.degree}</p>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional background</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {userData.experience.map((exp) => (
                <div key={exp.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-medium">{exp.position}</h3>
                      </div>
                      <p className="text-muted-foreground mt-1">{exp.company}</p>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{exp.duration}</span>
                      </div>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your technical and professional skills</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>{skill.name}</Label>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.level} className="h-2 flex-1" />
                      <span className="text-sm font-medium w-8">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

