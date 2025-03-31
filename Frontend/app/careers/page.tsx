"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2,
  Sliders,
  ArrowRight,
  Lightbulb,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Career data type
interface Career {
  id: string
  title: string
  description: string
  matchScore: number
  salary: string
  growth: string
  education: string
  skills: string[]
  category: string
  interests: string[]
  workEnvironment: string[]
  personalityTraits: string[]
}

// Job data type
interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  description: string
  requirements: string[]
  relatedCareers: string[]
  matchScore: number
}

export default function CareersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("match")
  const [showMatchForm, setShowMatchForm] = useState(true)
  const [matchedCareers, setMatchedCareers] = useState<Career[]>([])
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([])
  const [isMatching, setIsMatching] = useState(false)
  const [isLoadingJobs, setIsLoadingJobs] = useState(false)

  // User preferences state
  const [userPreferences, setUserPreferences] = useState({
    interests: [] as string[],
    skills: [] as string[],
    education: "",
    workStyle: "",
    values: [] as string[],
    salaryImportance: 50,
    workLifeBalance: 50,
    growthPotential: 50,
  })

  // Mock data for careers
  const careerData: Career[] = [
    {
      id: "software-developer",
      title: "Software Developer",
      description: "Design, develop, and maintain software applications and systems.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$70,000 - $120,000",
      growth: "22% (Much faster than average)",
      education: "Bachelor's degree in Computer Science or related field",
      skills: ["JavaScript", "React", "Node.js", "Problem Solving", "Communication"],
      category: "Technology",
      interests: ["Technology", "Problem Solving", "Innovation"],
      workEnvironment: ["Office", "Remote", "Team-based"],
      personalityTraits: ["Analytical", "Detail-oriented", "Creative"],
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      description: "Analyze data to help companies make better business decisions.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$60,000 - $90,000",
      growth: "18% (Faster than average)",
      education: "Bachelor's degree in Statistics, Mathematics, or related field",
      skills: ["SQL", "Excel", "Data Visualization", "Statistical Analysis", "Critical Thinking"],
      category: "Technology",
      interests: ["Data", "Analysis", "Business"],
      workEnvironment: ["Office", "Team-based"],
      personalityTraits: ["Analytical", "Detail-oriented", "Methodical"],
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      description: "Create meaningful and relevant experiences for users of products and services.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$65,000 - $110,000",
      growth: "13% (Faster than average)",
      education: "Bachelor's degree in Design, HCI, or related field",
      skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Empathy"],
      category: "Design",
      interests: ["Design", "Psychology", "Technology"],
      workEnvironment: ["Creative Studio", "Team-based"],
      personalityTraits: ["Creative", "Empathetic", "Observant"],
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      description: "Develop and implement marketing strategies to promote products and services.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$50,000 - $85,000",
      growth: "10% (Average)",
      education: "Bachelor's degree in Marketing, Business, or related field",
      skills: ["Social Media", "Content Creation", "Analytics", "Communication", "Creativity"],
      category: "Business",
      interests: ["Marketing", "Communication", "Social Media"],
      workEnvironment: ["Office", "Creative", "Team-based"],
      personalityTraits: ["Creative", "Outgoing", "Strategic"],
    },
    {
      id: "project-manager",
      title: "Project Manager",
      description: "Plan, execute, and close projects while ensuring they're on time and within budget.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$65,000 - $110,000",
      growth: "8% (Average)",
      education: "Bachelor's degree in Business, Management, or related field",
      skills: ["Leadership", "Organization", "Communication", "Risk Management", "Budgeting"],
      category: "Business",
      interests: ["Leadership", "Organization", "Business"],
      workEnvironment: ["Office", "Team-based"],
      personalityTraits: ["Organized", "Leadership", "Communication"],
    },
    {
      id: "cybersecurity-analyst",
      title: "Cybersecurity Analyst",
      description: "Protect computer systems and networks from information disclosure and security breaches.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$75,000 - $130,000",
      growth: "31% (Much faster than average)",
      education: "Bachelor's degree in Cybersecurity, Computer Science, or related field",
      skills: ["Network Security", "Risk Analysis", "Security Protocols", "Ethical Hacking", "Problem Solving"],
      category: "Technology",
      interests: ["Security", "Technology", "Problem Solving"],
      workEnvironment: ["Office", "Remote", "Team-based"],
      personalityTraits: ["Detail-oriented", "Analytical", "Vigilant"],
    },
    {
      id: "healthcare-administrator",
      title: "Healthcare Administrator",
      description:
        "Plan, direct, and coordinate medical and health services in hospitals, clinics, or healthcare facilities.",
      matchScore: 0, // Will be calculated based on preferences
      salary: "$65,000 - $115,000",
      growth: "32% (Much faster than average)",
      education: "Bachelor's degree in Healthcare Administration, Business, or related field",
      skills: ["Healthcare Knowledge", "Management", "Communication", "Organization", "Problem Solving"],
      category: "Healthcare",
      interests: ["Healthcare", "Management", "Organization"],
      workEnvironment: ["Hospital", "Clinic", "Office"],
      personalityTraits: ["Organized", "Compassionate", "Leadership"],
    },
  ]

  // Mock data for jobs
  const jobData: Job[] = [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "Tech Solutions Ltd",
      location: "Remote",
      salary: "$80,000 - $100,000",
      description:
        "We're looking for a Frontend Developer to join our team and help build responsive web applications.",
      requirements: ["3+ years of experience with React", "Strong JavaScript skills", "CSS/SASS expertise"],
      relatedCareers: ["Software Developer", "UX Designer"],
      matchScore: 92,
    },
    {
      id: "job2",
      title: "Full Stack Developer",
      company: "Innovate Uganda",
      location: "Kampala, Uganda",
      salary: "$70,000 - $90,000",
      description: "Join our team to develop and maintain web applications using modern technologies.",
      requirements: ["Experience with Node.js and React", "Database knowledge", "API development"],
      relatedCareers: ["Software Developer"],
      matchScore: 88,
    },
    {
      id: "job3",
      title: "Data Analyst",
      company: "Data Insights Co",
      location: "Hybrid",
      salary: "$65,000 - $85,000",
      description: "Help our clients make data-driven decisions through analysis and visualization.",
      requirements: ["SQL proficiency", "Experience with data visualization tools", "Statistical analysis"],
      relatedCareers: ["Data Analyst"],
      matchScore: 85,
    },
    {
      id: "job4",
      title: "UX/UI Designer",
      company: "Creative Digital",
      location: "Nairobi, Kenya",
      salary: "$60,000 - $80,000",
      description: "Design user-centered interfaces for web and mobile applications.",
      requirements: ["Portfolio of UX/UI work", "Proficiency in design tools", "User research experience"],
      relatedCareers: ["UX Designer"],
      matchScore: 78,
    },
    {
      id: "job5",
      title: "Digital Marketing Specialist",
      company: "Growth Marketing Agency",
      location: "Remote",
      salary: "$55,000 - $75,000",
      description: "Develop and implement digital marketing strategies for our clients.",
      requirements: ["Experience with social media marketing", "SEO knowledge", "Content creation skills"],
      relatedCareers: ["Marketing Specialist"],
      matchScore: 75,
    },
    {
      id: "job6",
      title: "Project Coordinator",
      company: "Global Solutions",
      location: "Lagos, Nigeria",
      salary: "$50,000 - $70,000",
      description: "Assist in planning, executing, and closing projects across multiple departments.",
      requirements: ["Project management experience", "Strong organizational skills", "Communication skills"],
      relatedCareers: ["Project Manager"],
      matchScore: 70,
    },
    {
      id: "job7",
      title: "Cybersecurity Specialist",
      company: "SecureTech",
      location: "Remote",
      salary: "$85,000 - $110,000",
      description: "Protect our systems and networks from security threats and breaches.",
      requirements: ["Security certifications", "Network security experience", "Incident response"],
      relatedCareers: ["Cybersecurity Analyst"],
      matchScore: 90,
    },
    {
      id: "job8",
      title: "Healthcare Operations Manager",
      company: "City Hospital",
      location: "Accra, Ghana",
      salary: "$70,000 - $95,000",
      description: "Oversee daily operations of our healthcare facility to ensure quality patient care.",
      requirements: ["Healthcare experience", "Management skills", "Knowledge of healthcare regulations"],
      relatedCareers: ["Healthcare Administrator"],
      matchScore: 85,
    },
  ]

  // Available options for form
  const interestOptions = [
    "Technology",
    "Design",
    "Business",
    "Healthcare",
    "Education",
    "Science",
    "Arts",
    "Communication",
    "Data",
    "Leadership",
  ]

  const skillOptions = [
    "Programming",
    "Design",
    "Analysis",
    "Communication",
    "Problem Solving",
    "Leadership",
    "Organization",
    "Creativity",
    "Research",
    "Technical Writing",
  ]

  const educationOptions = [
    "High School",
    "Some College",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
  ]

  const workStyleOptions = ["Remote", "Office-based", "Hybrid", "Flexible", "Field work"]

  const valueOptions = [
    "Work-Life Balance",
    "High Salary",
    "Job Security",
    "Growth Opportunities",
    "Making an Impact",
    "Creativity",
    "Independence",
    "Team Collaboration",
  ]

  // Calculate career matches based on user preferences
  const calculateCareerMatches = () => {
    setIsMatching(true)

    // Simulate processing time
    setTimeout(() => {
      const scoredCareers = careerData.map((career) => {
        let score = 0

        // Match interests (high weight)
        const interestMatch = career.interests.filter((interest) => userPreferences.interests.includes(interest)).length
        score += (interestMatch / career.interests.length) * 30

        // Match skills (high weight)
        const skillMatch = career.skills.filter((skill) => userPreferences.skills.includes(skill.toLowerCase())).length
        score += (skillMatch / career.skills.length) * 25

        // Match education (medium weight)
        if (career.education.toLowerCase().includes(userPreferences.education.toLowerCase())) {
          score += 15
        }

        // Match work environment (medium weight)
        if (career.workEnvironment.some((env) => env.toLowerCase() === userPreferences.workStyle.toLowerCase())) {
          score += 10
        }

        // Adjust for salary importance
        if (career.salary.includes("120,000") && userPreferences.salaryImportance > 70) {
          score += 10
        }

        // Adjust for growth potential
        if (career.growth.includes("faster") && userPreferences.growthPotential > 70) {
          score += 10
        }

        return {
          ...career,
          matchScore: Math.min(Math.round(score), 100), // Cap at 100%
        }
      })

      // Sort by match score and take top 3
      const topCareers = scoredCareers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)

      setMatchedCareers(topCareers)
      setShowMatchForm(false)
      setIsMatching(false)
    }, 1500)
  }

  // Find related jobs for a selected career
  const findRelatedJobs = (career: Career) => {
    setIsLoadingJobs(true)
    setSelectedCareer(career)

    // Simulate API call
    setTimeout(() => {
      const filtered = jobData.filter((job) => job.relatedCareers.includes(career.title))

      setRelatedJobs(filtered)
      setIsLoadingJobs(false)
    }, 1000)
  }

  // Handle form input changes
  const handleInterestChange = (interest: string) => {
    setUserPreferences((prev) => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) }
      } else {
        return { ...prev, interests: [...prev.interests, interest] }
      }
    })
  }

  const handleSkillChange = (skill: string) => {
    setUserPreferences((prev) => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) }
      } else {
        return { ...prev, skills: [...prev.skills, skill] }
      }
    })
  }

  const handleValueChange = (value: string) => {
    setUserPreferences((prev) => {
      if (prev.values.includes(value)) {
        return { ...prev, values: prev.values.filter((v) => v !== value) }
      } else {
        return { ...prev, values: [...prev.values, value] }
      }
    })
  }

  // Reset the form and results
  const resetForm = () => {
    setUserPreferences({
      interests: [],
      skills: [],
      education: "",
      workStyle: "",
      values: [],
      salaryImportance: 50,
      workLifeBalance: 50,
      growthPotential: 50,
    })
    setShowMatchForm(true)
    setMatchedCareers([])
    setSelectedCareer(null)
    setRelatedJobs([])
  }

  // View all careers
  const viewAllCareers = () => {
    setActiveTab("all")
  }

  // Navigate to jobs page with filter
  const viewAllJobsForCareer = (career: Career) => {
    // In a real app, you would use query params or state management
    // For now, we'll just navigate to the jobs page
    router.push(`/jobs?career=${career.title}`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Careers</h1>
        <p className="text-muted-foreground">Discover career paths that match your skills and interests</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="match" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="match">Career Matching</TabsTrigger>
          <TabsTrigger value="all">All Careers</TabsTrigger>
          <TabsTrigger value="trending">Trending Careers</TabsTrigger>
        </TabsList>

        {/* Career Matching Tab */}
        <TabsContent value="match" className="space-y-6">
          {showMatchForm ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sliders className="h-5 w-5 mr-2 text-primary" />
                  Find Your Career Match
                </CardTitle>
                <CardDescription>
                  Tell us about your preferences, skills, and interests to get personalized career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Interests Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">What are your interests?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select all that apply to you. These help us understand what fields might interest you.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {interestOptions.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={userPreferences.interests.includes(interest)}
                            onCheckedChange={() => handleInterestChange(interest)}
                          />
                          <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">What skills do you have or want to develop?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select skills you already possess or are interested in developing.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={userPreferences.skills.includes(skill.toLowerCase())}
                            onCheckedChange={() => handleSkillChange(skill.toLowerCase())}
                          />
                          <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Education and Work Style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Education Level</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select your current or expected education level.
                      </p>
                      <Select
                        value={userPreferences.education}
                        onValueChange={(value) => setUserPreferences({ ...userPreferences, education: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationOptions.map((option) => (
                            <SelectItem key={option} value={option.toLowerCase()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Preferred Work Style</h3>
                      <p className="text-sm text-muted-foreground mb-4">How would you prefer to work?</p>
                      <RadioGroup
                        value={userPreferences.workStyle}
                        onValueChange={(value) => setUserPreferences({ ...userPreferences, workStyle: value })}
                      >
                        {workStyleOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.toLowerCase()} id={`workstyle-${option}`} />
                            <Label htmlFor={`workstyle-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <Separator />

                  {/* Values and Priorities */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">What do you value in a career?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select what matters most to you in your career.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {valueOptions.map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`value-${value}`}
                            checked={userPreferences.values.includes(value)}
                            onCheckedChange={() => handleValueChange(value)}
                          />
                          <Label htmlFor={`value-${value}`}>{value}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Sliders for Importance */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>How important is salary to you?</Label>
                        <span className="text-sm font-medium">
                          {userPreferences.salaryImportance < 33
                            ? "Less Important"
                            : userPreferences.salaryImportance < 66
                              ? "Moderately Important"
                              : "Very Important"}
                        </span>
                      </div>
                      <Slider
                        value={[userPreferences.salaryImportance]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) =>
                          setUserPreferences({ ...userPreferences, salaryImportance: value[0] })
                        }
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>How important is work-life balance?</Label>
                        <span className="text-sm font-medium">
                          {userPreferences.workLifeBalance < 33
                            ? "Less Important"
                            : userPreferences.workLifeBalance < 66
                              ? "Moderately Important"
                              : "Very Important"}
                        </span>
                      </div>
                      <Slider
                        value={[userPreferences.workLifeBalance]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setUserPreferences({ ...userPreferences, workLifeBalance: value[0] })}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>How important is career growth potential?</Label>
                        <span className="text-sm font-medium">
                          {userPreferences.growthPotential < 33
                            ? "Less Important"
                            : userPreferences.growthPotential < 66
                              ? "Moderately Important"
                              : "Very Important"}
                        </span>
                      </div>
                      <Slider
                        value={[userPreferences.growthPotential]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setUserPreferences({ ...userPreferences, growthPotential: value[0] })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                <Button onClick={calculateCareerMatches} disabled={isMatching}>
                  {isMatching ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Matching...
                    </>
                  ) : (
                    <>
                      Find My Career Matches
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              {/* Results Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Your Top Career Matches</h2>
                  <Button variant="outline" onClick={resetForm}>
                    Try Again
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Based on your preferences, these careers might be a good fit for you. Click on a career to see related
                  job opportunities.
                </p>
              </div>

              {/* Matched Careers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {matchedCareers.map((career, index) => (
                  <Card
                    key={career.id}
                    className={`transition-all duration-200 hover:shadow-md ${
                      selectedCareer?.id === career.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => findRelatedJobs(career)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="font-bold text-primary">{index + 1}</span>
                          </div>
                          <CardTitle>{career.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {career.matchScore}% Match
                        </Badge>
                      </div>
                      <CardDescription>{career.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Match Score</span>
                          <span className="font-medium">{career.matchScore}%</span>
                        </div>
                        <Progress value={career.matchScore} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <Briefcase className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Salary Range</p>
                            <p className="text-muted-foreground">{career.salary}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <TrendingUp className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Growth</p>
                            <p className="text-muted-foreground">{career.growth}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Key Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{career.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => findRelatedJobs(career)}>
                        {selectedCareer?.id === career.id ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Selected
                          </>
                        ) : (
                          <>
                            View Details & Jobs
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Related Jobs Section */}
              {selectedCareer && (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                        Jobs Related to {selectedCareer.title}
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={() => viewAllJobsForCareer(selectedCareer)}>
                        View All Jobs
                      </Button>
                    </div>
                    <CardDescription>Explore job opportunities that match your selected career path</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingJobs ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : relatedJobs.length > 0 ? (
                      <div className="space-y-4">
                        {relatedJobs.map((job) => (
                          <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {job.company} • {job.location}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                {job.matchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">{job.description}</p>
                            <div className="mb-3">
                              <p className="text-sm font-medium mb-1">Requirements:</p>
                              <ul className="text-sm text-muted-foreground list-disc list-inside">
                                {job.requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">{job.salary}</p>
                              <Button size="sm">Apply Now</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                        <p className="text-muted-foreground mb-4">
                          We couldn't find any job listings related to this career at the moment.
                        </p>
                        <Button variant="outline" onClick={() => viewAllJobsForCareer(selectedCareer)}>
                          Browse All Jobs
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-center">
                <Button variant="outline" onClick={viewAllCareers}>
                  Explore All Careers
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        {/* All Careers Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search careers, skills, or industries..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Career Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerData
              .filter(
                (career) =>
                  career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  career.category.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((career, index) => (
                <Card key={career.id} className="transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{career.title}</CardTitle>
                      <Badge variant="outline">{career.category}</Badge>
                    </div>
                    <CardDescription className="mt-1">{career.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start">
                        <Briefcase className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Salary Range</p>
                          <p className="text-muted-foreground">{career.salary}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Growth</p>
                          <p className="text-muted-foreground">{career.growth}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <GraduationCap className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Education</p>
                          <p className="text-muted-foreground truncate">{career.education}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Preparation</p>
                          <p className="text-muted-foreground">2-4 years</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {career.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{career.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href={`/career/${career.id}`}>
                        Explore Career <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {careerData.filter(
            (career) =>
              career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              career.category.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No careers found matching your search criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Trending Careers Tab */}
        <TabsContent value="trending" className="space-y-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Fastest Growing Careers
              </CardTitle>
              <CardDescription>
                These careers are projected to have the highest growth rates in the next decade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerData
                  .sort((a, b) => {
                    const aGrowth = Number.parseInt(a.growth)
                    const bGrowth = Number.parseInt(b.growth)
                    return bGrowth - aGrowth
                  })
                  .slice(0, 5)
                  .map((career, index) => (
                    <div
                      key={career.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{career.title}</h3>
                        <p className="text-sm text-muted-foreground">{career.growth} growth rate</p>
                      </div>
                      <div className="hidden md:block flex-1">
                        <p className="text-sm font-medium">Median Salary</p>
                        <p className="text-sm text-muted-foreground">{career.salary}</p>
                      </div>
                      <div className="hidden md:block flex-1">
                        <p className="text-sm font-medium">Required Education</p>
                        <p className="text-sm text-muted-foreground truncate">{career.education}</p>
                      </div>
                      <Button size="sm" asChild>
                        <a href={`/career/${career.id}`}>Details</a>
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Highest Paying Careers
                </CardTitle>
                <CardDescription>Careers with the highest median salaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerData
                    .sort((a, b) => {
                      const aMax = Number.parseInt(a.salary.split("$")[1].split(",").join("").split(" - ")[1])
                      const bMax = Number.parseInt(b.salary.split("$")[1].split(",").join("").split(" - ")[1])
                      return bMax - aMax
                    })
                    .slice(0, 5)
                    .map((career, index) => (
                      <div key={career.id} className="flex items-center justify-between p-3 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{career.title}</p>
                            <p className="text-xs text-muted-foreground">{career.category}</p>
                          </div>
                        </div>
                        <p className="font-medium">{career.salary}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Entry-Level Friendly
                </CardTitle>
                <CardDescription>Careers that are accessible with less experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerData
                    .filter(
                      (career) =>
                        career.education.includes("Associate") ||
                        career.education.includes("Bachelor") ||
                        !career.education.includes("Master"),
                    )
                    .slice(0, 5)
                    .map((career, index) => (
                      <div key={career.id} className="flex items-center justify-between p-3 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{career.title}</p>
                            <p className="text-xs text-muted-foreground">{career.education}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={`/career/${career.id}`}>View</a>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

