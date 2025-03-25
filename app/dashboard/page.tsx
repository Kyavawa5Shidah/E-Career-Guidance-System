"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Briefcase,
  GraduationCap,
  LineChart,
  ListChecks,
  PieChart,
  Plus,
  Star,
  TrendingUp,
  User,
} from "lucide-react"

// Add this interface at the top of the file, before the component definition
interface SidebarLinkProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const userData = {
    name: "John Doe",
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
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.jobMatches.length}</div>
                <p className="text-xs text-muted-foreground">Matching job opportunities</p>
                <Button variant="link" className="p-0 h-auto mt-3" asChild>
                  <Link href="/jobs">View all jobs</Link>
                </Button>
              </CardContent>
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

