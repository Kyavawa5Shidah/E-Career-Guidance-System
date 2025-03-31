"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, ListChecks } from "lucide-react"

interface AssessmentCardProps {
  id: string
  title: string
  description: string
  duration: string
  questions: number
  icon: React.ReactNode
}

interface CompletedAssessmentCardProps {
  id: string
  title: string
  description: string
  completedDate: string
  score: number
  icon: React.ReactNode
}

// Add these type definitions at the top of the file, after the existing interfaces
type QuestionId = number
type AssessmentId = string

export default function AssessmentPage() {
  const [activeTab, setActiveTab] = useState("available")
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentId | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<QuestionId, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock data for assessments
  const assessments = {
    available: [
      {
        id: "technical-skills",
        title: "Technical Skills Assessment",
        description: "Evaluate your programming and technical abilities",
        duration: "15 minutes",
        questions: 10,
        icon: <ListChecks className="h-5 w-5" />,
      },
      {
        id: "soft-skills",
        title: "Soft Skills Assessment",
        description: "Assess your communication and interpersonal skills",
        duration: "10 minutes",
        questions: 8,
        icon: <ListChecks className="h-5 w-5" />,
      },
      {
        id: "career-interests",
        title: "Career Interests",
        description: "Discover which career paths align with your interests",
        duration: "12 minutes",
        questions: 15,
        icon: <ListChecks className="h-5 w-5" />,
      },
    ],
    completed: [
      {
        id: "personality-traits",
        title: "Personality Traits",
        description: "Understanding your work style and preferences",
        completedDate: "April 15, 2023",
        score: 85,
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        id: "learning-style",
        title: "Learning Style",
        description: "How you best absorb and process information",
        completedDate: "March 28, 2023",
        score: 92,
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  }

  // Update the technicalSkillsQuestions type
  const technicalSkillsQuestions: Array<{
    id: QuestionId
    question: string
    options: Array<{ value: string; label: string }>
  }> = [
    {
      id: 1,
      question: "How comfortable are you with HTML and CSS?",
      options: [
        { value: "1", label: "Not familiar at all" },
        { value: "2", label: "Basic understanding" },
        { value: "3", label: "Comfortable with most concepts" },
        { value: "4", label: "Very proficient" },
        { value: "5", label: "Expert level" },
      ],
    },
    {
      id: 2,
      question: "Rate your experience with JavaScript programming:",
      options: [
        { value: "1", label: "No experience" },
        { value: "2", label: "Beginner level" },
        { value: "3", label: "Intermediate level" },
        { value: "4", label: "Advanced level" },
        { value: "5", label: "Expert level" },
      ],
    },
    {
      id: 3,
      question: "How familiar are you with database concepts?",
      options: [
        { value: "1", label: "Not familiar" },
        { value: "2", label: "Basic understanding" },
        { value: "3", label: "Comfortable with SQL" },
        { value: "4", label: "Experienced with multiple database systems" },
        { value: "5", label: "Expert in database design and optimization" },
      ],
    },
    {
      id: 4,
      question: "Rate your experience with version control systems (e.g., Git):",
      options: [
        { value: "1", label: "Never used" },
        { value: "2", label: "Basic commands only" },
        { value: "3", label: "Comfortable with branching and merging" },
        { value: "4", label: "Advanced usage including rebasing" },
        { value: "5", label: "Expert level" },
      ],
    },
    {
      id: 5,
      question: "How would you rate your problem-solving skills?",
      options: [
        { value: "1", label: "Need significant improvement" },
        { value: "2", label: "Basic problem-solving abilities" },
        { value: "3", label: "Good at solving most problems" },
        { value: "4", label: "Very strong problem-solver" },
        { value: "5", label: "Exceptional problem-solving abilities" },
      ],
    },
  ]

  // Update the startAssessment function
  const startAssessment = (assessmentId: AssessmentId) => {
    setCurrentAssessment(assessmentId)
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
  }

  // Update the handleAnswer function
  const handleAnswer = (questionId: QuestionId, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < technicalSkillsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Complete the assessment
      setIsCompleted(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const resetAssessment = () => {
    setCurrentAssessment(null)
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
  }

  // Render the assessment questions
  if (currentAssessment) {
    const questions = technicalSkillsQuestions
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    if (isCompleted) {
      return (
        <div className="container mx-auto py-8 px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Assessment Completed!</CardTitle>
              <CardDescription className="text-center">
                Thank you for completing the Technical Skills Assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Your Results</h3>
              <p className="text-muted-foreground mb-6">
                We've analyzed your responses and updated your profile with the results.
              </p>
              <div className="w-full max-w-md">
                <div className="flex justify-between mb-2">
                  <span>Technical Proficiency</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="mb-4" />

                <div className="flex justify-between mb-2">
                  <span>Problem Solving</span>
                  <span className="font-medium">82%</span>
                </div>
                <Progress value={82} className="mb-4" />

                <div className="flex justify-between mb-2">
                  <span>Overall Score</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="mb-4" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" asChild>
                <Link href="/dashboard">View Recommendations</Link>
              </Button>
              <Button variant="outline" onClick={resetAssessment}>
                Back to Assessments
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Button variant="ghost" size="sm" onClick={resetAssessment}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>15 minutes</span>
              </div>
            </div>
            <CardTitle>Technical Skills Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                      <Label htmlFor={`option-${option.value}`} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button onClick={nextQuestion} disabled={!answers[currentQ.id]}>
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              {currentQuestion !== questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Render the assessment list
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Skill Assessments</h1>
          <p className="text-muted-foreground">Evaluate your skills and discover career matches</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="available">Available Assessments</TabsTrigger>
          <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.available.map((assessment: AssessmentCardProps) => (
              <Card key={assessment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {assessment.icon}
                  </div>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{assessment.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ListChecks className="mr-2 h-4 w-4" />
                    <span>{assessment.questions} questions</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => startAssessment(assessment.id)}>
                    Start Assessment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.completed.map((assessment: CompletedAssessmentCardProps) => (
              <Card key={assessment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    {assessment.icon}
                  </div>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Completed on {assessment.completedDate}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Score</span>
                      <span className="text-sm font-medium">{assessment.score}%</span>
                    </div>
                    <Progress value={assessment.score} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/assessment/results/${assessment.id}`}>View Results</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

