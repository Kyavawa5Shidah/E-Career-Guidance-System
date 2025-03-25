import Link from "next/link"
import { ArrowLeft, Briefcase, BarChart, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Add these interfaces at the top of the file
interface CareerDetailProps {
  params: {
    slug: string
  }
}

interface CareerData {
  title: string
  description: string
  averageSalary: string
  growthRate: string
  educationRequired: string
  experienceLevel: string
  keySkills: Array<{
    name: string
    level: number
  }>
  relatedCourses: Array<{
    name: string
    provider: string
    duration: string
  }>
  jobOpportunities: Array<{
    title: string
    company: string
    location: string
  }>
}

// Update the component definition
export default function CareerDetailPage({ params }: CareerDetailProps) {
  // Convert slug to a readable title (e.g., "software-developer" to "Software Developer")
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock career data
  const career: CareerData = {
    title,
    description: `A ${title} is responsible for designing, developing, and maintaining software applications or systems. They work with various programming languages and frameworks to create solutions that meet user needs and business requirements.`,
    averageSalary: "$800 - $1,500/month",
    growthRate: "+15% annually",
    educationRequired: "Bachelor's degree in Computer Science or related field",
    experienceLevel: "Entry-level to Senior positions available",
    keySkills: [
      { name: "Programming", level: 85 },
      { name: "Problem Solving", level: 90 },
      { name: "Software Design", level: 75 },
      { name: "Database Management", level: 70 },
      { name: "Version Control", level: 80 },
    ],
    relatedCourses: [
      { name: "Web Development Fundamentals", provider: "Coursera", duration: "8 weeks" },
      { name: "Data Structures and Algorithms", provider: "edX", duration: "10 weeks" },
      { name: "Software Engineering Principles", provider: "Udemy", duration: "6 weeks" },
    ],
    jobOpportunities: [
      { title: "Junior Software Developer", company: "Tech Solutions Ltd", location: "Kampala" },
      { title: "Frontend Developer", company: "Innovate Uganda", location: "Kampala" },
      { title: "Mobile App Developer", company: "AppWorks", location: "Remote" },
    ],
  }

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

        {/* Career Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{career.title}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <BarChart className="w-4 h-4 mr-1" />
                        {career.growthRate} growth
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {career.educationRequired}
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">85% Match</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Career Overview</h2>
                <p className="text-gray-600 mb-6">{career.description}</p>

                <h3 className="text-lg font-bold mb-2">Average Salary</h3>
                <p className="text-gray-600 mb-4">{career.averageSalary}</p>

                <h3 className="text-lg font-bold mb-2">Required Education</h3>
                <p className="text-gray-600 mb-4">{career.educationRequired}</p>

                <h3 className="text-lg font-bold mb-2">Experience Levels</h3>
                <p className="text-gray-600">{career.experienceLevel}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Key Skills Required</h2>
                <div className="space-y-4">
                  {career.keySkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Recommended Courses</h2>
                <div className="space-y-4">
                  {career.relatedCourses.map((course, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">{course.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{course.provider}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto mt-1" asChild>
                        <Link href="#">View Course</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Opportunities</h2>
                <div className="space-y-4">
                  {career.jobOpportunities.map((job, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto mt-1" asChild>
                        <Link href={`/job/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>View Job</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/jobs">View All Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

