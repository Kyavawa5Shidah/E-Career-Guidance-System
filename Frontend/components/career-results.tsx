"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface CareerResult {
  title: string
  matchScore: number
  description: string
  requiredSkills: string[]
  industryType: string
}

interface CareerResultsProps {
  results: CareerResult[]
}

export default function CareerResults({ results }: CareerResultsProps) {
  // Add console log to debug the results
  console.log("Career results received:", results)

  const careerResults = Array.isArray(results) ? results : []

  // Check if we have any results to display
  const initialExpandedJobs: { [key: string]: boolean } = {}
  if (Array.isArray(results)) {
    results.forEach((career) => {
      initialExpandedJobs[career.title] = false
    })
  }

  const [expandedJobs, setExpandedJobs] = useState(initialExpandedJobs)

  if (careerResults.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Career Matches Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find any career matches based on your criteria. Try adjusting your skills or interests.
        </p>
      </div>
    )
  }

  const toggleJobDetails = (title: string) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Career Matches</h2>

      {results && results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((career, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {career.industryType}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Match Score</span>
                    <span className="text-sm font-medium">{career.matchScore}%</span>
                  </div>
                  <Progress value={career.matchScore} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-4">{career.description}</CardDescription>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills?.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={() => toggleJobDetails(career.title)} className="w-full">
                  {expandedJobs[career.title] ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Hide Job Listings
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      View Job Listings
                    </>
                  )}
                </Button>
              </CardFooter>

              {expandedJobs[career.title] && (
                <div className="px-6 pb-6 border-t pt-4">
                  <h4 className="font-medium mb-3">Sample Job Listings</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{career.title} at TechCorp</span>
                        <Badge variant="outline">Remote</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Join our team as a {career.title} and work on cutting-edge projects.
                      </p>
                      <div className="text-sm">$80K - $120K • Full-time</div>
                    </div>
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Senior {career.title} at InnovateCo</span>
                        <Badge variant="outline">Hybrid</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Looking for an experienced {career.title} to lead our growing team.
                      </p>
                      <div className="text-sm">$100K - $150K • Full-time</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No career matches found. Try adjusting your criteria.</p>
        </div>
      )}
    </div>
  )
}
