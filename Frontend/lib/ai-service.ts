// Types for our AI service
export interface CareerRecommendation {
    career: string
    matchScore: number
    requiredSkills: string[]
    description: string
  }
  
  export interface LearningPathRecommendation {
    steps: Array<{
      title: string
      description: string
      resources: Array<{
        title: string
        type: "course" | "book" | "practice" | "project"
        provider?: string
        link?: string
      }>
      timeframe: string
      level: "beginner" | "intermediate" | "advanced"
    }>
    estimatedTime: string
  }
  
  // Mock AI service
  export const aiService = {
    // Get career recommendations based on skills
    async getCareerRecommendations(skills: string[]): Promise<CareerRecommendation[]> {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
  
      // Mock response - in a real implementation, this would come from an AI service
      return [
        {
          career: "Software Developer",
          matchScore: 87,
          requiredSkills: ["JavaScript", "React", "Node.js", "Git"],
          description: "Software developers design, build, and maintain computer programs and applications.",
        },
        {
          career: "Data Analyst",
          matchScore: 78,
          requiredSkills: ["SQL", "Excel", "Data Visualization", "Python"],
          description:
            "Data analysts interpret data to provide actionable insights and help make better business decisions.",
        },
        {
          career: "UX Designer",
          matchScore: 72,
          requiredSkills: ["User Research", "Wireframing", "Prototyping", "UI Design"],
          description:
            "UX designers create user-centered designs for websites and applications to enhance user satisfaction.",
        },
      ]
    },
  
    // Get a learning path for a specific career
    async getLearningPath(career: string): Promise<LearningPathRecommendation> {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
  
      // Mock response - in a real implementation, this would come from an AI service
      return {
        steps: [
          {
            title: "Foundations",
            description: "Build core skills and understanding",
            resources: [
              { title: "Introduction to Programming", type: "course", provider: "Coursera" },
              { title: "HTML, CSS & JavaScript Basics", type: "course", provider: "freeCodeCamp" },
              { title: "Simple Personal Portfolio", type: "project" },
            ],
            timeframe: "2-3 months",
            level: "beginner",
          },
          {
            title: "Core Technologies",
            description: "Develop essential technical skills",
            resources: [
              { title: "React Fundamentals", type: "course", provider: "Udemy" },
              { title: "Node.js Essentials", type: "course", provider: "Pluralsight" },
              { title: "Build a Web Application", type: "project" },
            ],
            timeframe: "3-4 months",
            level: "intermediate",
          },
          {
            title: "Advanced Concepts",
            description: "Master specialized knowledge",
            resources: [
              { title: "Advanced JavaScript Patterns", type: "course", provider: "Frontend Masters" },
              { title: "System Design", type: "book", provider: "O'Reilly" },
              { title: "Full-Stack Application", type: "project" },
            ],
            timeframe: "4-6 months",
            level: "advanced",
          },
        ],
        estimatedTime: "9-12 months",
      }
    },
  
    // Process a chat message
    async processMessage(message: string): Promise<string> {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
  
      // Mock AI response - in a real implementation, this would come from an AI service
      if (message.toLowerCase().includes("career") || message.toLowerCase().includes("job")) {
        return "Based on your profile, I'd recommend exploring careers in software development, data analysis, or UX design. Would you like more specific information about any of these paths?"
      } else if (message.toLowerCase().includes("learn") || message.toLowerCase().includes("skill")) {
        return "To enhance your career prospects, I recommend focusing on these key skills: JavaScript frameworks like React, database technologies, and cloud services. These are in high demand in the current job market."
      } else {
        return "I'm here to help with your career guidance needs. You can ask me about recommended career paths, learning resources, or skill development strategies. What would you like to know more about?"
      }
    },
  }
  
  