"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Building2, User, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"studio" | "instructor" | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const fitnessSkills = [
    "Yoga",
    "Pilates",
    "Lagree",
    "Personal Training",
    "Group Fitness",
    "CrossFit",
    "Strength Training",
    "Cardio",
    "HIIT",
    "Barre",
    "Spin/Cycling",
    "Boxing",
    "Martial Arts",
    "Dance Fitness",
    "Aqua Fitness",
    "Rehabilitation",
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">InstructorConnect</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join InstructorConnect</h1>
            <p className="text-xl text-gray-600">Choose how you'd like to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => setUserType("studio")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">I'm a Fitness Studio</CardTitle>
                <CardDescription className="text-base">Looking to hire qualified fitness instructors</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Post unlimited job listings
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Browse instructor profiles
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Manage applications & bookings
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Build your studio brand
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Register as Studio</Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => setUserType("instructor")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">I'm a Fitness Instructor</CardTitle>
                <CardDescription className="text-base">Looking for fitness teaching opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Create professional profile
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Apply to job opportunities
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Manage your availability
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Connect with top studios
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Register as Instructor</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Selection
          </button>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Dumbbell className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === "studio" ? "Studio Registration" : "Instructor Registration"}
          </h1>
          <p className="text-gray-600">
            {userType === "studio"
              ? "Create your studio profile and start posting jobs"
              : "Build your professional profile and find opportunities"}
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+61 4XX XXX XXX" />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nsw">New South Wales</SelectItem>
                      <SelectItem value="vic">Victoria</SelectItem>
                      <SelectItem value="qld">Queensland</SelectItem>
                      <SelectItem value="wa">Western Australia</SelectItem>
                      <SelectItem value="sa">South Australia</SelectItem>
                      <SelectItem value="tas">Tasmania</SelectItem>
                      <SelectItem value="act">Australian Capital Territory</SelectItem>
                      <SelectItem value="nt">Northern Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Studio-specific fields */}
              {userType === "studio" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Studio Information</h3>

                  <div>
                    <Label htmlFor="studioName">Studio Name</Label>
                    <Input id="studioName" placeholder="Your Fitness Studio Name" />
                  </div>

                  <div>
                    <Label htmlFor="studioAddress">Studio Address</Label>
                    <Input id="studioAddress" placeholder="123 Fitness Street, Melbourne VIC 3000" />
                  </div>

                  <div>
                    <Label htmlFor="studioDescription">Studio Description</Label>
                    <Textarea
                      id="studioDescription"
                      placeholder="Tell us about your studio, values, and what makes you unique..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="studioSize">Studio Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select studio size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-2 instructors)</SelectItem>
                        <SelectItem value="medium">Medium (3-10 instructors)</SelectItem>
                        <SelectItem value="large">Large (11-25 instructors)</SelectItem>
                        <SelectItem value="chain">Chain/Franchise (25+ instructors)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Instructor-specific fields */}
              {userType === "instructor" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>

                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fitness Specialties</Label>
                    <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {fitnessSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedSkills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-orange-100 text-orange-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your fitness journey, qualifications, and teaching philosophy..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">General Availability</Label>
                    <Textarea
                      id="availability"
                      placeholder="Describe your general availability (e.g., weekday mornings, weekend classes, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-500 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" />
                  <Label htmlFor="marketing" className="text-sm">
                    I'd like to receive updates about new opportunities and platform features
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                  Create My {userType === "studio" ? "Studio" : "Instructor"} Account
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-500 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
