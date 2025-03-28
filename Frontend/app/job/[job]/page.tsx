import Link from "next/link"
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Add these interfaces at the top of the file
interface JobDetailProps {
  params: {
    slug: string
  }
}

interface JobData {
  title: string
  company: string
  location: string
  jobType: string
  salary: string
  postedDate: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  skills: string[]
}

// Update the component definition
export default function JobDetailPage({ params }: JobDetailProps) {
  // Convert slug to a readable title (e.g., "frontend-developer" to "Frontend Developer")
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock job data
  const job = {
    title,
    company: "Tech Solutions Ltd",
    location: "Kampala, Uganda",
    jobType: "Full-time",
    salary: "$800 - $1,200/month",
    postedDate: "2 days ago",
    description: `We are looking for a skilled ${title} to join our team. You will be responsible for building user interfaces using modern technologies and implementing responsive designs.

    The ideal candidate should have strong problem-solving skills and be comfortable working in a fast-paced environment.`,
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Troubleshoot and debug applications",
      "Stay up-to-date with emerging trends and technologies",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "2+ years of experience in web development",
      "Proficiency in JavaScript, HTML, and CSS",
      "Experience with modern frameworks and libraries",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Competitive salary",
      "Flexible working hours",
      "Health insurance",
      "Professional development opportunities",
      "Friendly and collaborative work environment",
    ],
    skills: ["JavaScript", "React", "HTML/CSS", "Responsive Design", "Git"],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Listings
            </Link>
          </Button>
        </div>

        {/* Job Header */}
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
                    <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.jobType}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-gray-600 whitespace-pre-line mb-6">{job.description}</p>

                <h3 className="text-lg font-bold mb-2">Responsibilities:</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-600">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-600">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mb-2">Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>
                <p className="text-gray-600 mb-4">Ready to apply? Click the button below to submit your application.</p>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Share this Job</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
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

