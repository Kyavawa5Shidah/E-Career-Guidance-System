"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowLeft, Send, Bot, Sparkles, PlusCircle, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { aiService } from "@/lib/ai-service"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Example career paths for quick suggestions
const CAREER_SUGGESTIONS = [
  "Software Development",
  "Data Science",
  "UX/UI Design",
  "Digital Marketing",
  "Project Management",
  "Cybersecurity",
]

// Example skills for quick suggestions
const SKILLS_SUGGESTIONS = ["JavaScript", "Python", "Design", "Communication", "Leadership", "Data Analysis"]

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your AI Career Advisor. I can help recommend career paths based on your skills, or suggest learning resources for your career goals. What would you like to discuss today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call our AI service
      const response = await aiService.processMessage(input)

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error processing message:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    // Focus input after setting the quick prompt
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const startNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hello! I'm your AI Career Advisor. I can help recommend career paths based on your skills, or suggest learning resources for your career goals. What would you like to discuss today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">AI Career Advisor</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={startNewChat}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Conversation
                </Button>
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Quick Prompts</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-auto py-2 text-left"
                      onClick={() =>
                        handleQuickPrompt("What career paths match my JavaScript and communication skills?")
                      }
                    >
                      <Sparkles className="mr-2 h-3 w-3 text-primary" />
                      Match careers to my skills
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-auto py-2 text-left"
                      onClick={() => handleQuickPrompt("How do I become a Data Scientist?")}
                    >
                      <Sparkles className="mr-2 h-3 w-3 text-primary" />
                      Learning path for a career
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-auto py-2 text-left"
                      onClick={() => handleQuickPrompt("What skills should I develop for a career in UX/UI Design?")}
                    >
                      <Sparkles className="mr-2 h-3 w-3 text-primary" />
                      Skills for specific career
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="md:col-span-3">
          <Card className="flex flex-col h-[70vh]">
            <CardHeader className="px-4 py-3 border-b flex-shrink-0">
              <CardTitle className="text-sm font-medium flex items-center">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                AI Career Advisor
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                        {message.role === "assistant" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarFallback className="bg-secondary">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t mt-auto">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask about career paths or learning recommendations..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || input.trim() === ""}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </Card>

          {/* Mobile Quick Prompts */}
          <div className="mt-4 md:hidden">
            <Card>
              <CardContent className="py-4">
                <h3 className="text-sm font-medium mb-2">Quick Prompts</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2 text-xs"
                    onClick={() => handleQuickPrompt("What career paths match my JavaScript and communication skills?")}
                  >
                    Match careers to my skills
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2 text-xs"
                    onClick={() => handleQuickPrompt("How do I become a Data Scientist?")}
                  >
                    Learning path for a career
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

