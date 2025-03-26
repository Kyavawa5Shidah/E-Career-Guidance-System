"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { aiService } from "@/lib/ai-service"
import { Bot, Send, User, Sparkles, Lightbulb, BookOpen, Briefcase, GraduationCap } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI Career Advisor. I can help you explore career options, provide guidance on skill development, and answer questions about educational pathways. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Suggested questions for quick access
  const suggestedQuestions = [
    "What skills should I develop for a career in tech?",
    "How do I prepare for a job interview?",
    "What education is needed for data science?",
    "How can I transition to a new career?",
    "What are the fastest growing careers?",
  ]

  // Career insights for the Insights tab
  const careerInsights = [
    {
      title: "Tech Skills in Demand",
      description: "JavaScript, Python, and cloud computing are among the most in-demand skills in 2023.",
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Remote Work Trends",
      description:
        "Remote work opportunities have increased by 140% since 2020, with tech and marketing leading the way.",
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Education Pathways",
      description: "Alternative education like bootcamps and certifications are gaining recognition among employers.",
      icon: <GraduationCap className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Soft Skills Matter",
      description: "Communication, adaptability, and problem-solving are the top soft skills employers look for.",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
    },
  ]

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await aiService.processMessage(inputValue)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Career Advisor</h1>
        <p className="text-muted-foreground">Get personalized career guidance and answers to your questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>AI Career Advisor</CardTitle>
                  </div>
                  <TabsList>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>Ask questions about careers, skills, and education</CardDescription>
              </CardHeader>

              <TabsContent value="chat" className="flex-1 flex flex-col px-0 pt-0 pb-0">
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex max-w-[80%] ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            } rounded-lg px-4 py-2`}
                          >
                            {message.sender === "ai" && <Bot className="h-5 w-5 mr-2 mt-0.5 shrink-0" />}
                            <div>
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                            {message.sender === "user" && <User className="h-5 w-5 ml-2 mt-0.5 shrink-0" />}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                <CardFooter className="pt-4 border-t">
                  <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Input
                      placeholder="Type your question here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                      {isLoading ? (
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span className="sr-only">Send</span>
                    </Button>
                  </form>
                </CardFooter>
              </TabsContent>

              <TabsContent value="insights" className="flex-1 flex flex-col">
                <CardContent className="flex-1">
                  <h3 className="text-lg font-medium mb-4">Career Insights & Trends</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerInsights.map((insight, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            {insight.icon}
                            <CardTitle className="text-base ml-2">{insight.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                Suggested Questions
              </CardTitle>
              <CardDescription>Quick prompts to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How I Can Help</CardTitle>
              <CardDescription>Ways I can assist with your career journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2">1</Badge>
                  <p className="text-sm">
                    Provide personalized career recommendations based on your skills and interests
                  </p>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2">2</Badge>
                  <p className="text-sm">Suggest skills to develop for specific career paths</p>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2">3</Badge>
                  <p className="text-sm">Offer guidance on education and training options</p>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2">4</Badge>
                  <p className="text-sm">Help with job search strategies and interview preparation</p>
                </div>
                <div className="flex items-start">
                  <Badge className="mt-0.5 mr-2">5</Badge>
                  <p className="text-sm">Provide insights on industry trends and job market outlook</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

