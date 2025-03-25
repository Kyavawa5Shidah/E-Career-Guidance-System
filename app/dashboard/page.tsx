"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bot,
  Briefcase,
  GraduationCap,
  LineChart,
  ListChecks,
  MessageSquareText,
  PieChart,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Add this interface at the top of the file, before the component definition
interface SidebarLinkProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth()
  const [aiRecommendations, setAiRecommendations] = useState<{
    careerMatch: string
    matchPercentage: number
    recommendedSkills: string[]
    personalized: boolean
  }>({
    careerMatch: "",
    matchPercentage: 0,
    recommendedSkills: [],
    personalized: false,
  })

  // Mock data for the dashboard
  const userData = {
    name: user?.name || "User",
    completedAssessments: 2,
    totalAssessments: 5,
    skillsMatched: 65,
    recommendedCareers: [
      { title: "Software Developer", match: 85 },
      { title: "Data Analyst", match: 78 },
      { title: "UX Designer", match: 72 },
    ],
    recentActivities: [
      { type: "assessment", title: "Technical Skills Assessment", date: "2 days ago" },
      { type: "career", title: "Viewed Software Developer career path", date: "3 days ago" },
      { type: "job", title: "Applied for Frontend Developer at Tech Co", date: "1 week ago" },
    ],
    upcomingEvents: [
      { title: "Career Workshop: Tech Industry", date: "May 15, 2023" },
      { title: "Mock Interview Session", date: "May 20, 2023" },
    ],
    jobMatches: [
      { title: "Frontend Developer", company: "Tech Solutions Ltd", match: 92 },
      { title: "Junior Software Engineer", company: "Innovate Uganda", match: 88 },
      { title: "Web Developer", company: "Digital Creatives", match: 75 },
    ],
    skillsToImprove: [
      { name: "JavaScript", progress: 65 },
      { name: "React", progress: 45 },
      { name: "UI/UX Design", progress: 30 },
    ],
  }

  // Simulate loading AI recommendations
  useEffect(() => {
    const getAiRecommendations = async () => {
      // In a real app, this would be an API call to your AI service
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setAiRecommendations({
        careerMatch: "Full Stack Developer",
        matchPercentage: 87,
        recommendedSkills: ["Node.js", "React", "Database Design"],
        personalized: true,
      })
    }

    getAiRecommendations()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userData.name}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button asChild>
            <Link href="/assessment">
              <ListChecks className="mr-2 h-4 w-4" />
              Take Assessment
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* New AI Advisor Card */}
      <div className="mb-6">
        <Card className="relative overflow-hidden border-primary/20">
          <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 opacity-5">
            <Bot className="w-full h-full text-primary" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <CardTitle>AI Career Insight</CardTitle>
            </div>
            <CardDescription>Personalized career recommendations powered by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="p-4 rounded-lg bg-primary/5 mb-4">
                  {aiRecommendations.personalized ? (
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Top Career Match: {aiRecommendations.careerMatch}</h3>
                        <div className="flex justify-between text-sm mt-1 mb-1">
                          <span>Match Score</span>
                          <span className="font-medium">{aiRecommendations.matchPercentage}%</span>
                        </div>
                        <Progress value={aiRecommendations.matchPercentage} className="h-2" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mt-3">Recommended Skills to Develop:</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {aiRecommendations.recommendedSkills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-24">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mb-2"></div>
                        <p className="text-sm text-muted-foreground">Analyzing your profile...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  Our AI analyzes your skills, experience, and assessment results to provide tailored career
                  recommendations.
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link href="/ai-advisor">
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Ask AI Advisor
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/assessment">
                    <ListChecks className="mr-2 h-4 w-4" />
                    Complete Assessment
                  </Link>
                </Button>
                <div className="mt-2 text-center text-xs text-muted-foreground">
                  More assessments = better recommendations
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Assessment Progress</CardTitle>
                <ListChecks className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userData.completedAssessments}/{userData.totalAssessments}
                </div>
                <p className="text-xs text-muted-foreground">Assessments completed</p>
                <Progress value={(userData.completedAssessments / userData.totalAssessments) * 100} className="mt-3" />
              </CardContent>
              <CardFooter className="pt-0 pb-3 px-6">
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/assessment">Take next assessment</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Skills Match</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.skillsMatched}%</div>
                <p className="text-xs text-muted-foreground">Match with top career</p>
                <Progress value={userData.skillsMatched} className="mt-3" />
              </CardContent>
              <CardFooter className="pt-0 pb-3 px-6">
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/skill-assessment">View skills details</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.jobMatches.length}</div>
                <p className="text-xs text-muted-foreground">Matching job opportunities</p>
                <Progress value={75} className="mt-3" />
              </CardContent>
              <CardFooter className="pt-0 pb-3 px-6">
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/jobs">View all jobs</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recommended Careers */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Careers</CardTitle>
              <CardDescription>Based on your skills and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recommendedCareers.map((career, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{career.title}</div>
                        <div className="text-sm text-muted-foreground">{career.match}% match</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/career/${career.title.toLowerCase().replace(/\s+/g, "-")}`}>View</Link>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link href="/careers">
                    <Plus className="mr-2 h-4 w-4" />
                    Explore More Careers
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity and Upcoming Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {activity.type === "assessment" ? (
                          <ListChecks className="h-4 w-4 text-primary" />
                        ) : activity.type === "career" ? (
                          <GraduationCap className="h-4 w-4 text-primary" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events that might interest you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab content remains the same */}
        <TabsContent value="careers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Matches</CardTitle>
              <CardDescription>Careers that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.recommendedCareers.map((career, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{career.title}</div>
                          <div className="text-sm text-muted-foreground">{career.match}% match</div>
                        </div>
                      </div>
                      <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-full">
                        {career.match}% Match
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={career.match} className="h-2" />
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        Compare Skills
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/career/${career.title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills to Improve</CardTitle>
              <CardDescription>Focus on these skills to enhance your career prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.skillsToImprove.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <div className="flex justify-end mt-2">
                      <Button variant="link" className="h-auto p-0 text-sm">
                        Find resources
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>Compare your skills with industry requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center">
                  <BarChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Complete more assessments to view your skill gap analysis</p>
                  <Button className="mt-4" asChild>
                    <Link href="/assessment">Take Assessment</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Matches</CardTitle>
              <CardDescription>Jobs that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.jobMatches.map((job, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground">{job.company}</div>
                      </div>
                      <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-full">
                        {job.match}% Match
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={job.match} className="h-2" />
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Compare Skills
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/job/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>View Job</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6" asChild>
                <Link href="/jobs">
                  <Briefcase className="mr-2 h-4 w-4" />
                  View All Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {activity.type === "assessment" ? (
                        <ListChecks className="h-5 w-5 text-primary" />
                      ) : activity.type === "career" ? (
                        <GraduationCap className="h-5 w-5 text-primary" />
                      ) : (
                        <Briefcase className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.type === "assessment"
                          ? "You completed an assessment to evaluate your skills."
                          : activity.type === "career"
                            ? "You explored a career path to learn more about it."
                            : "You applied for a job position."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events that might interest you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Join this event to enhance your career prospects and networking opportunities.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add to Calendar
                      </Button>
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

// Then update the SidebarLink component at the bottom of the file
function SidebarLink({ icon, label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
        active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

