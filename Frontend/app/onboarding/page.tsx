"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Sliders, RefreshCw, ChevronRight, AlertCircle } from "lucide-react"

// Define user preferences type
interface UserPreferences {
  interests: string[]
  skills: string[]
  education: string
  workStyle: string
  values: string[]
  salaryImportance: number
  workLifeBalance: number
  growthPotential: number
  personalityTraits: string[]
  experience: string
}

// Define user profile type
interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
  education: {
    level: string
    institution: string
    fieldOfStudy: string
    graduationYear: string
  }
  experience: {
    years: string
    currentTitle: string
    currentCompany: string
  }
  preferences: UserPreferences
  profileCompleted: boolean
  firstLogin: boolean
}

export default function OnboardingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [progress, setProgress] = useState(0)

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

  const personalityOptions = [
    "Analytical",
    "Creative",
    "Detail-oriented",
    "Leadership",
    "Team Player",
    "Independent",
    "Innovative",
    "Adaptable",
  ]

  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"]

  // Initial user profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    education: {
      level: "",
      institution: "",
      fieldOfStudy: "",
      graduationYear: "",
    },
    experience: {
      years: "",
      currentTitle: "",
      currentCompany: "",
    },
    preferences: {
      interests: [],
      skills: [],
      education: "",
      workStyle: "",
      values: [],
      salaryImportance: 50,
      workLifeBalance: 50,
      growthPotential: 50,
      personalityTraits: [],
      experience: "",
    },
    profileCompleted: false,
    firstLogin: true,
  })

  // Check if user already completed onboarding
  useEffect(() => {
    // In a real app, this would be an API call to check user status
    const checkUserStatus = () => {
      const storedProfile = localStorage.getItem("userProfile")

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)
        if (parsedProfile.profileCompleted) {
          // User already completed onboarding, redirect to dashboard
          router.push("/dashboard")
        }
      }
    }

    checkUserStatus()
  }, [router])

  // Update progress based on step
  useEffect(() => {
    const totalSteps = 4
    setProgress((step / totalSteps) * 100)
  }, [step])

  // Handle form input changes for basic profile
  const handleProfileChange = (field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form input changes for education
  const handleEducationChange = (field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }))
  }

  // Handle form input changes for experience
  const handleExperienceChange = (field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        [field]: value,
      },
    }))
  }

  // Handle interest checkbox changes
  const handleInterestChange = (interest: string) => {
    setUserProfile((prev) => {
      const interests = prev.preferences.interests.includes(interest)
        ? prev.preferences.interests.filter((i) => i !== interest)
        : [...prev.preferences.interests, interest]

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          interests,
        },
      }
    })
  }

  // Handle skill checkbox changes
  const handleSkillChange = (skill: string) => {
    setUserProfile((prev) => {
      const skills = prev.preferences.skills.includes(skill)
        ? prev.preferences.skills.filter((s) => s !== skill)
        : [...prev.preferences.skills, skill]

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          skills,
        },
      }
    })
  }

  // Handle value checkbox changes
  const handleValueChange = (value: string) => {
    setUserProfile((prev) => {
      const values = prev.preferences.values.includes(value)
        ? prev.preferences.values.filter((v) => v !== value)
        : [...prev.preferences.values, value]

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          values,
        },
      }
    })
  }

  // Handle personality trait checkbox changes
  const handlePersonalityChange = (trait: string) => {
    setUserProfile((prev) => {
      const traits = prev.preferences.personalityTraits.includes(trait)
        ? prev.preferences.personalityTraits.filter((t) => t !== trait)
        : [...prev.preferences.personalityTraits, trait]

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          personalityTraits: traits,
        },
      }
    })
  }

  // Handle preference changes
  const handlePreferenceChange = (field: string, value: any) => {
    setUserProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  // Go to next step
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  // Go to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Complete onboarding
  const completeOnboarding = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // Update profile completed status
      const updatedProfile = {
        ...userProfile,
        profileCompleted: true,
        firstLogin: false,
      }

      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile))

      // Set the profileCompleted cookie to true
      document.cookie = `profileCompleted=true; path=/; max-age=86400`

      setIsSaving(false)

      // Show toast message
      toast({
        title: "Profile setup complete",
        description: "Your profile has been created successfully.",
      })

      // Redirect to the previous dashboard
      router.push("/dashboard")
    }, 1500)
  }

  // Validate current step
  const validateStep = () => {
    switch (step) {
      case 1: // Basic info
        return userProfile.firstName.trim() !== "" && userProfile.lastName.trim() !== ""
      case 2: // Education & Experience
        return userProfile.education.level !== ""
      case 3: // Interests & Skills
        return userProfile.preferences.interests.length > 0 && userProfile.preferences.skills.length > 0
      case 4: // Work preferences
        return userProfile.preferences.workStyle !== ""
      default:
        return true
    }
  }

  // Skip onboarding
  const skipOnboarding = () => {
    // Save minimal profile
    const minimalProfile = {
      ...userProfile,
      profileCompleted: true,
      firstLogin: false,
    }

    localStorage.setItem("userProfile", JSON.stringify(minimalProfile))
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to ECGS!</h1>
        <p className="text-muted-foreground">Let's set up your profile to get personalized career recommendations.</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {step} of 4</span>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sliders className="h-5 w-5 mr-2 text-primary" />
            {step === 1 && "Tell Us About Yourself"}
            {step === 2 && "Education & Experience"}
            {step === 3 && "Your Interests & Skills"}
            {step === 4 && "Work Preferences"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "This information helps us personalize your experience"}
            {step === 2 && "Tell us about your educational background and work experience"}
            {step === 3 && "Select your interests and skills to help us find the best career matches"}
            {step === 4 && "Let us know what you value in your ideal work environment"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={userProfile.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={userProfile.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={userProfile.location}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {!validateStep() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Please enter your first and last name to continue.</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Education <span className="text-destructive">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="educationLevel">Highest Education Level</Label>
                    <Select
                      value={userProfile.education.level}
                      onValueChange={(value) => handleEducationChange("level", value)}
                    >
                      <SelectTrigger id="educationLevel" className="mt-1">
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
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      placeholder="University/College Name"
                      value={userProfile.education.institution}
                      onChange={(e) => handleEducationChange("institution", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      placeholder="Major/Concentration"
                      value={userProfile.education.fieldOfStudy}
                      onChange={(e) => handleEducationChange("fieldOfStudy", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Work Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceYears">Years of Experience</Label>
                    <Select
                      value={userProfile.experience.years}
                      onValueChange={(value) => handleExperienceChange("years", value)}
                    >
                      <SelectTrigger id="experienceYears" className="mt-1">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currentTitle">Current/Most Recent Job Title</Label>
                    <Input
                      id="currentTitle"
                      placeholder="e.g. Software Developer"
                      value={userProfile.experience.currentTitle}
                      onChange={(e) => handleExperienceChange("currentTitle", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {!validateStep() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Please select your highest education level to continue.</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  What are your interests? <span className="text-destructive">*</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all that apply to you. These help us understand what fields might interest you.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={userProfile.preferences.interests.includes(interest)}
                        onCheckedChange={() => handleInterestChange(interest)}
                      />
                      <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">
                  What skills do you have or want to develop? <span className="text-destructive">*</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select skills you already possess or are interested in developing.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={userProfile.preferences.skills.includes(skill.toLowerCase())}
                        onCheckedChange={() => handleSkillChange(skill.toLowerCase())}
                      />
                      <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {!validateStep() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Please select at least one interest and one skill to continue.</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Preferred Work Style <span className="text-destructive">*</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">How would you prefer to work?</p>
                <RadioGroup
                  value={userProfile.preferences.workStyle}
                  onValueChange={(value) => handlePreferenceChange("workStyle", value)}
                >
                  {workStyleOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.toLowerCase()} id={`workstyle-${option}`} />
                      <Label htmlFor={`workstyle-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">What do you value in a career?</h3>
                <p className="text-sm text-muted-foreground mb-4">Select what matters most to you in your career.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {valueOptions.map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`value-${value}`}
                        checked={userProfile.preferences.values.includes(value)}
                        onCheckedChange={() => handleValueChange(value)}
                      />
                      <Label htmlFor={`value-${value}`}>{value}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">How would you describe yourself?</h3>
                <p className="text-sm text-muted-foreground mb-4">Select personality traits that best describe you.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {personalityOptions.map((trait) => (
                    <div key={trait} className="flex items-center space-x-2">
                      <Checkbox
                        id={`trait-${trait}`}
                        checked={userProfile.preferences.personalityTraits.includes(trait)}
                        onCheckedChange={() => handlePersonalityChange(trait)}
                      />
                      <Label htmlFor={`trait-${trait}`}>{trait}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>How important is salary to you?</Label>
                    <span className="text-sm font-medium">
                      {userProfile.preferences.salaryImportance < 33
                        ? "Less Important"
                        : userProfile.preferences.salaryImportance < 66
                          ? "Moderately Important"
                          : "Very Important"}
                    </span>
                  </div>
                  <Slider
                    value={[userProfile.preferences.salaryImportance]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePreferenceChange("salaryImportance", value[0])}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>How important is work-life balance?</Label>
                    <span className="text-sm font-medium">
                      {userProfile.preferences.workLifeBalance < 33
                        ? "Less Important"
                        : userProfile.preferences.workLifeBalance < 66
                          ? "Moderately Important"
                          : "Very Important"}
                    </span>
                  </div>
                  <Slider
                    value={[userProfile.preferences.workLifeBalance]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePreferenceChange("workLifeBalance", value[0])}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>How important is career growth potential?</Label>
                    <span className="text-sm font-medium">
                      {userProfile.preferences.growthPotential < 33
                        ? "Less Important"
                        : userProfile.preferences.growthPotential < 66
                          ? "Moderately Important"
                          : "Very Important"}
                    </span>
                  </div>
                  <Slider
                    value={[userProfile.preferences.growthPotential]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePreferenceChange("growthPotential", value[0])}
                  />
                </div>
              </div>

              {!validateStep() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Please select your preferred work style to continue.</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <Button variant="outline" onClick={skipOnboarding}>
              Skip for Now
            </Button>
          ) : (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}

          {step < 4 ? (
            <Button onClick={nextStep} disabled={!validateStep()}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={completeOnboarding} disabled={isSaving || !validateStep()}>
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

