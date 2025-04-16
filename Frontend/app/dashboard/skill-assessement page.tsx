"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Interface for a skill entry
interface SkillEntry {
  name: string
  type: string
  score: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [assessmentData, setAssessmentData] = useState<{ skills: SkillEntry[] } | null>(null)
  const [skillTypeData, setSkillTypeData] = useState<{ name: string; value: number }[]>([])
  const [skillBreakdownData, setSkillBreakdownData] = useState<{ name: string; score: number; category: string }[]>([])
  const [strongSkills, setStrongSkills] = useState<string[]>([])
  const [skillsToImprove, setSkillsToImprove] = useState<{ skill: string; score: number }[]>([])

  useEffect(() => {
    // Get assessment data from localStorage
    const storedData = localStorage.getItem("assessmentData")

    if (!storedData) {
      // No assessment data, keep loading state
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }

    try {
      const parsedData = JSON.parse(storedData) as { skills: SkillEntry[] }
      setAssessmentData(parsedData)

      // Process the data for charts and displays
      processAssessmentData(parsedData.skills)

      setLoading(false)
    } catch (e) {
      console.error("Error parsing assessment data:", e)
      setLoading(false)
    }
  }, [])

  // Function to process assessment data
  const processAssessmentData = (skills: SkillEntry[]) => {
    // Group skills by type
    const skillsByType: Record<string, SkillEntry[]> = {}
    skills.forEach((skill) => {
      if (!skillsByType[skill.type]) {
        skillsByType[skill.type] = []
      }
      skillsByType[skill.type].push(skill)
    })

    // Calculate average score for each type
    const averageScores: Record<string, number> = {}
    Object.entries(skillsByType).forEach(([type, typeSkills]) => {
      const totalScore = typeSkills.reduce((sum, skill) => sum + skill.score, 0)
      averageScores[type] = (totalScore / typeSkills.length) * 20 // Convert to percentage (0-100)
    })

    // Prepare data for skill type chart
    const skillTypeChartData = Object.entries(averageScores).map(([name, value]) => ({
      name,
      value,
    }))
    setSkillTypeData(skillTypeChartData)

    // Prepare data for skill breakdown chart
    const skillBreakdownChartData = skills.map((skill) => ({
      name: skill.name,
      score: skill.score,
      category: skill.type,
    }))
    setSkillBreakdownData(skillBreakdownChartData)

    // Identify strong skills and skills to improve
    const strong = skills.filter((skill) => skill.score >= 4).map((skill) => skill.name)
    setStrongSkills(strong)

    const toImprove = skills
      .filter((skill) => skill.score < 4)
      .sort((a, b) => a.score - b.score)
      .slice(0, 4)
      .map((skill) => ({ skill: skill.name, score: skill.score }))
    setSkillsToImprove(toImprove)
  }

  if (loading) {
    return (
      <div className="container max-w-6xl py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Loading dashboard...</h2>
          <Progress value={75} className="w-[300px]" />
        </div>
      </div>
    )
  }

  // If no assessment data is available
  if (!assessmentData) {
    return (
      <div className="container max-w-6xl py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-2 py-8">
              <h2 className="text-2xl font-semibold">No Assessment Data Available</h2>
              <p className="text-muted-foreground max-w-md">
                You haven't completed a skill assessment yet. Take an assessment to see your personalized dashboard.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/assessment">Take Assessment</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Skills Dashboard</h1>
        <p className="text-muted-foreground">
          Track your skill development progress and identify areas for improvement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Skills Assessed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{assessmentData.skills.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Last assessment: {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Strong Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{strongSkills.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Skills with proficiency level 4-5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Skills to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{assessmentData.skills.length - strongSkills.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Skills with proficiency level 1-3</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Skill Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Proficiency by Category</CardTitle>
              <CardDescription>Your skill proficiency scores across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Proficiency"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Distribution of skills by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Proficiency"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Opportunities</CardTitle>
                <CardDescription>Skills with the most room for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsToImprove.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <span>{skill.score}/5</span>
                      </div>
                      <Progress value={skill.score * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Category: {assessmentData.skills.find((s) => s.name === skill.skill)?.type}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/assessment">Take New Assessment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Detailed view of all assessed skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillBreakdownData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value}/5`, "Proficiency"]} />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your progress on recommended learning resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillsToImprove.slice(0, 3).map((skill, index) => {
                  // Generate random progress for demo purposes
                  const progress = Math.floor(Math.random() * 80) + 10
                  const startDate = new Date()
                  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30))

                  return (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">Started: {startDate.toLocaleDateString()}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/assessment/results">View All Recommendations</Link>
                </Button>
                <Button asChild>
                  <Link href="/assessment">Take New Assessment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
