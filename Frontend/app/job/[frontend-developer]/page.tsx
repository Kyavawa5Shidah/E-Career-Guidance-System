"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Building,
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Job data type
interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  relatedCareers: string[]
  matchScore: number
  jobType: string
  postedDate: string
  experience: string
  applicationDeadline: string
  companyDescription: string
}

export default function JobDetailPage({ params }: { params: { job: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [isSaved, setIsSaved] = useState(false)

  // Convert job slug to a readable title (e.g., "frontend-developer" to "Frontend Developer")
  const jobTitle = params.job
    ? params.job
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : ""

  // Fetch job data
  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoading(true)

      // In a real app, this would be an API call to fetch job details
      // For now, we'll simulate with mock data
      setTimeout(() => {
        // Find job that matches the slug
        const foundJob = mockJobs.find((j) => j.id === params.job)

        if (foundJob) {
          setJob(foundJob)
        }

        setIsLoading(false)
      }, 800)
    }

    fetchJobData()
  }, [params.job])

  // Handle apply for job
  const handleApply = () => {
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)

      toast({
        title: "Application submitted",
        description: "Your application has been successfully submitted.",
        type: "success",
      })
    }, 1500)
  }

  // Handle save job
  const toggleSaveJob = () => {
    setIsSaved(!isSaved)

    toast({
      title: isSaved ? "Job removed from saved jobs" : "Job saved",
      description: isSaved
        ? "This job has been removed from your saved jobs."
        : "This job has been added to your saved jobs.",
      type: "default",
    })
  }

  // Handle share job
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy the link
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied",
      description: "Job link has been copied to clipboard.",
      type: "default",
    })
  }

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-48 bg-muted rounded mb-8"></div>

          <div className="h-64 bg-muted rounded-lg mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  // If job not found
  if (!job) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Job not found. The job you're looking for may have been removed or doesn't exist.
          </AlertDescription>
        </Alert>

        <Button variant="outline" onClick={() => router.push("/jobs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" className="mb-4" onClick={() => router.push("/jobs")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <Building className="h-4 w-4 mr-1" />
              <span className="mr-3">{job.company}</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
          </div>

          <Badge variant="outline" className="bg-primary/10 text-primary w-fit">
            {job.matchScore}% Match
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <TabsContent value="description" className="space-y-6 mt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    {job.jobType}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    {job.salary}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <GraduationCap className="h-3.5 w-3.5 mr-1" />
                    {job.experience}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Posted {job.postedDate}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="company" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-2">About {job.company}</h3>
                  <p className="text-muted-foreground">{job.companyDescription}</p>
                </div>

                <div className="flex items-center justify-center p-8">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                    <Building className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Industry</p>
                      <p className="text-muted-foreground">{job.relatedCareers[0]} Industry</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="application" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-2">Application Details</h3>
                  <p className="text-muted-foreground mb-4">
                    Submit your application for this position. Make sure your profile is up to date before applying.
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Application Deadline</span>
                      <span>{job.applicationDeadline}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Expected Response Time</span>
                      <span>1-2 weeks</span>
                    </div>

                    <Alert className="bg-primary/5 border-primary/20">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <AlertDescription>
                        Your profile matches {job.matchScore}% of the requirements for this position.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={handleApply} disabled={isApplying}>
                {isApplying ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Apply for this Position
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Match Score</span>
                  <span className="font-medium">{job.matchScore}%</span>
                </div>
                <Progress value={job.matchScore} className="h-2" />
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Job Type</p>
                    <p className="text-muted-foreground">{job.jobType}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Salary Range</p>
                    <p className="text-muted-foreground">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <GraduationCap className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-muted-foreground">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Posted</p>
                    <p className="text-muted-foreground">{job.postedDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={toggleSaveJob}>
                {isSaved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save Job
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Careers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {job.relatedCareers.map((career, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <span>{career}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <a href={`/career/${career.toLowerCase().replace(/\s+/g, "-")}`}>
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    company: "Tech Solutions Ltd",
    location: "Remote",
    salary: "$80,000 - $100,000",
    description:
      "We're looking for a Frontend Developer to join our team and help build responsive web applications. You'll work closely with designers and backend developers to implement user interfaces using modern frameworks and ensure a seamless user experience across all devices.",
    requirements: [
      "3+ years of experience with React",
      "Strong JavaScript skills",
      "CSS/SASS expertise",
      "Experience with responsive design",
      "Knowledge of frontend testing frameworks",
      "Familiarity with version control systems (Git)",
      "Good understanding of web performance optimization",
    ],
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Optimize applications for maximum speed and scalability",
      "Participate in code reviews and contribute to team discussions",
      "Stay up-to-date with emerging trends and technologies",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Remote work flexibility",
      "Professional development opportunities",
      "Health insurance",
      "Paid time off",
      "Modern equipment and tools",
    ],
    relatedCareers: ["Software Developer", "UX Designer", "Full Stack Developer"],
    matchScore: 92,
    jobType: "Full-time",
    postedDate: "2 days ago",
    experience: "3-5 years",
    applicationDeadline: "June 30, 2023",
    companyDescription:
      "Tech Solutions Ltd is a leading software development company specializing in creating innovative web and mobile applications for clients across various industries. With a team of talented developers, designers, and project managers, we deliver high-quality solutions that help businesses achieve their goals.",
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    company: "Innovate Uganda",
    location: "Kampala, Uganda",
    salary: "$70,000 - $90,000",
    description:
      "Join our team to develop and maintain web applications using modern technologies. You'll be responsible for both frontend and backend development, working on features from conception to deployment, and ensuring our applications are robust, scalable, and user-friendly.",
    requirements: [
      "Experience with Node.js and React",
      "Database knowledge (SQL, MongoDB)",
      "API development",
      "Understanding of web security",
      "Ability to work in an agile environment",
      "Problem-solving skills",
      "Good communication abilities",
    ],
    responsibilities: [
      "Design and implement both frontend and backend components",
      "Build reusable code and libraries for future use",
      "Optimize applications for performance and scalability",
      "Implement security and data protection measures",
      "Collaborate with cross-functional teams",
      "Troubleshoot and debug applications",
    ],
    benefits: [
      "Competitive compensation",
      "Flexible working hours",
      "Career growth opportunities",
      "Health benefits",
      "Team building activities",
      "Modern office space",
    ],
    relatedCareers: ["Software Developer", "Backend Developer", "Frontend Developer"],
    matchScore: 88,
    jobType: "Full-time",
    postedDate: "1 week ago",
    experience: "2-4 years",
    applicationDeadline: "July 15, 2023",
    companyDescription:
      "Innovate Uganda is a technology company focused on developing solutions that address local challenges. We believe in using technology to create positive change in communities across East Africa. Our diverse team of developers, designers, and business analysts work together to build products that make a difference.",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    company: "Data Insights Co",
    location: "Hybrid",
    salary: "$65,000 - $85,000",
    description:
      "Help our clients make data-driven decisions through analysis and visualization. You'll work with large datasets, create reports, and present findings to stakeholders, turning complex data into actionable insights that drive business strategy.",
    requirements: [
      "SQL proficiency",
      "Experience with data visualization tools (Tableau, Power BI)",
      "Statistical analysis",
      "Excel advanced features",
      "Communication skills",
      "Bachelor's degree in a quantitative field",
      "Problem-solving abilities",
    ],
    responsibilities: [
      "Collect, process, and analyze data from various sources",
      "Create and maintain dashboards and reports",
      "Identify trends and patterns in data",
      "Collaborate with teams to understand data needs",
      "Present findings to stakeholders",
      "Recommend improvements based on data insights",
    ],
    benefits: [
      "Competitive salary",
      "Hybrid work model",
      "Professional development budget",
      "Health and wellness programs",
      "Retirement benefits",
      "Regular team events",
    ],
    relatedCareers: ["Data Scientist", "Business Analyst", "Database Administrator"],
    matchScore: 85,
    jobType: "Full-time",
    postedDate: "3 days ago",
    experience: "2-5 years",
    applicationDeadline: "July 5, 2023",
    companyDescription:
      "Data Insights Co specializes in helping businesses leverage their data to make better decisions. We provide data analysis, visualization, and reporting services to clients across various industries. Our team of analysts and data scientists are passionate about turning data into actionable insights that drive business growth.",
  },
]

