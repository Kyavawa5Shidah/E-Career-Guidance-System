"use client"
import Link from "next/link"
import { ArrowLeft, BookOpen, Check, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssessmentCardProps {
  title: string
  description: string
  duration: string
  questions: number
  status: "not-started" | "in-progress" | "completed"
  progress?: number
}

interface LearningPathCardProps {
  title: string
  description: string
  provider: string
  duration: string
  level: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
}

export default function SkillAssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Skill Assessment & Learning</h1>
          <p className="text-gray-500 mt-2">Assess your skills and find learning resources to improve</p>
        </div>

        <Tabs defaultValue="assessment">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="assessment">Skill Assessment</TabsTrigger>
            <TabsTrigger value="learning">Learning Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-8">
            {/* Available Assessments */}
            <section>
              <h2 className="text-xl font-bold mb-4">Available Assessments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssessmentCard
                  title="Technical Skills Assessment"
                  description="Evaluate your programming, database, and web development skills."
                  duration="30 minutes"
                  questions={25}
                  status="not-started"
                />
                <AssessmentCard
                  title="Soft Skills Assessment"
                  description="Assess your communication, teamwork, and problem-solving abilities."
                  duration="20 minutes"
                  questions={20}
                  status="in-progress"
                  progress={40}
                />
                <AssessmentCard
                  title="Career Aptitude Test"
                  description="Discover which careers align with your natural aptitudes and interests."
                  duration="45 minutes"
                  questions={35}
                  status="completed"
                />
              </div>
            </section>

            {/* Assessment Results */}
            <section>
              <h2 className="text-xl font-bold mb-4">Your Assessment Results</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment Summary</CardTitle>
                  <CardDescription>Based on your completed assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Technical Skills</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Programming</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Web Development</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <Progress value={65} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Database Management</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <Progress value={70} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Mobile Development</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Soft Skills</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Communication</span>
                            <span className="text-sm font-medium">80%</span>
                          </div>
                          <Progress value={80} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Problem Solving</span>
                            <span className="text-sm font-medium">90%</span>
                          </div>
                          <Progress value={90} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Teamwork</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Time Management</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/skill-gap-analysis">View Detailed Analysis</Link>
                  </Button>
                </CardFooter>
              </Card>
            </section>

            {/* Skill Gap Analysis */}
            <section>
              <h2 className="text-xl font-bold mb-4">Skill Gap Analysis</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Skills to Develop for Software Developer</CardTitle>
                  <CardDescription>Based on your career match and assessment results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">React.js</span>
                        <span className="text-sm">Required: 80% | Your Level: 60%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Node.js</span>
                        <span className="text-sm">Required: 75% | Your Level: 45%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Design</span>
                        <span className="text-sm">Required: 70% | Your Level: 70%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">API Development</span>
                        <span className="text-sm">Required: 75% | Your Level: 50%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/learning-paths">View Recommended Courses</Link>
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="learning" className="space-y-8">
            {/* Recommended Learning Paths */}
            <section>
              <h2 className="text-xl font-bold mb-4">Recommended Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LearningPathCard
                  title="Web Development Fundamentals"
                  description="Master HTML, CSS, JavaScript and responsive design principles."
                  provider="Coursera"
                  duration="8 weeks"
                  level="Beginner"
                  progress={25}
                  status="in-progress"
                />
                <LearningPathCard
                  title="React.js Mastery"
                  description="Learn to build modern web applications with React.js and Redux."
                  provider="Udemy"
                  duration="10 weeks"
                  level="Intermediate"
                  progress={0}
                  status="not-started"
                />
                <LearningPathCard
                  title="Node.js Backend Development"
                  description="Build scalable backend services with Node.js, Express, and MongoDB."
                  provider="edX"
                  duration="12 weeks"
                  level="Intermediate"
                  progress={0}
                  status="not-started"
                />
              </div>
            </section>

            {/* Your Learning Progress */}
            <section>
              <h2 className="text-xl font-bold mb-4">Your Learning Progress</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Web Development Fundamentals</CardTitle>
                  <CardDescription>Course progress and modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Overall Progress</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} />
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Module 1: HTML Basics</h4>
                        <p className="text-sm text-gray-500">Completed on March 10, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Module 2: CSS Fundamentals</h4>
                        <p className="text-sm text-gray-500">Completed on March 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Module 3: JavaScript Basics</h4>
                        <p className="text-sm text-gray-500">In progress (2/8 lessons completed)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-gray-600">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Module 4: Responsive Design</h4>
                        <p className="text-sm text-gray-500">Not started</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-gray-600">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Module 5: Final Project</h4>
                        <p className="text-sm text-gray-500">Not started</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/learning/web-development">Continue Learning</Link>
                  </Button>
                </CardFooter>
              </Card>
            </section>

            {/* Additional Learning Resources */}
            <section>
              <h2 className="text-xl font-bold mb-4">Additional Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Free Online Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          MDN Web Docs
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          freeCodeCamp
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          W3Schools
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          JavaScript.info
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          GitHub Learning Lab
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Local Training Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          Makerere University ICT Bootcamp
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          Refactory Code Academy
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          Innovation Village Tech Programs
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          Outbox Hub Developer Training
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <a href="#" className="text-primary hover:underline">
                          Clarke International University IT Courses
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AssessmentCard({ title, description, duration, questions, status, progress = 0 }: AssessmentCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          {status === "completed" && (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Completed</div>
          )}
          {status === "in-progress" && (
            <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">In Progress</div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <span>{questions} questions</span>
        </div>
        {status === "in-progress" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        <Button className="w-full" variant={status === "completed" ? "outline" : "default"}>
          {status === "not-started" && "Start Assessment"}
          {status === "in-progress" && "Continue Assessment"}
          {status === "completed" && "View Results"}
        </Button>
      </CardContent>
    </Card>
  )
}

function LearningPathCard({ title, description, provider, duration, level, progress, status }: LearningPathCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          {status === "completed" && (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Completed</div>
          )}
          {status === "in-progress" && (
            <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">In Progress</div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{provider}</span>
          </div>
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{level}</span>
          </div>
        </div>
        {status === "in-progress" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        <Button className="w-full">
          {status === "not-started" && "Start Learning"}
          {status === "in-progress" && "Continue Learning"}
          {status === "completed" && "View Certificate"}
        </Button>
      </CardContent>
    </Card>
  )
}

