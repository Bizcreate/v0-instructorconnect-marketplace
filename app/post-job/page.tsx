"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Plus, Minus } from "lucide-react"

export default function PostJobPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requirements, setRequirements] = useState<string[]>([""])
  const [benefits, setBenefits] = useState<string[]>([""])

  const fitnessTypes = [
    "Yoga",
    "Pilates",
    "Lagree",
    "Personal Training",
    "Group Fitness",
    "CrossFit",
    "Strength Training",
    "HIIT",
    "Barre",
    "Spin/Cycling",
    "Boxing",
    "Martial Arts",
    "Dance Fitness",
    "Aqua Fitness",
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const addRequirement = () => {
    setRequirements([...requirements, ""])
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements]
    updated[index] = value
    setRequirements(updated)
  }

  const addBenefit = () => {
    setBenefits([...benefits, ""])
  }

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const updateBenefit = (index: number, value: string) => {
    const updated = [...benefits]
    updated[index] = value
    setBenefits(updated)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-orange-500">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
            <p className="text-gray-600">Find the perfect instructor for your fitness studio</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form className="space-y-8">
                {/* Basic Job Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>

                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input id="jobTitle" placeholder="e.g., Senior Yoga Instructor" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobType">Job Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input id="location" placeholder="e.g., Melbourne CBD, VIC" />
                    </div>
                  </div>

                  <div>
                    <Label>Fitness Types *</Label>
                    <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {fitnessTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={selectedSkills.includes(type)}
                            onCheckedChange={() => toggleSkill(type)}
                          />
                          <Label htmlFor={type} className="text-sm">
                            {type}
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
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and what makes your studio unique..."
                      rows={6}
                    />
                  </div>
                </div>

                {/* Schedule & Compensation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Schedule & Compensation</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input id="schedule" placeholder="e.g., Mon-Fri 6:30 AM & 7:00 PM" />
                    </div>
                    <div>
                      <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                      <Input id="hoursPerWeek" placeholder="e.g., 15-20 hours" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="payType">Pay Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pay type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per-class">Per Class</SelectItem>
                          <SelectItem value="per-session">Per Session</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="payMin">Minimum Rate ($)</Label>
                      <Input id="payMin" type="number" placeholder="75" />
                    </div>
                    <div>
                      <Label htmlFor="payMax">Maximum Rate ($)</Label>
                      <Input id="payMax" type="number" placeholder="95" />
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-3 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (4-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Specific Requirements</Label>
                    <p className="text-sm text-gray-600 mb-3">Add specific qualifications, certifications, or skills</p>
                    {requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder="e.g., 200hr Yoga Teacher Training"
                        />
                        {requirements.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRequirement}
                      className="mt-2 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Benefits & Perks</h3>

                  <div>
                    <Label>What We Offer</Label>
                    <p className="text-sm text-gray-600 mb-3">List the benefits and perks you offer</p>
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          placeholder="e.g., Free gym membership"
                        />
                        {benefits.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeBenefit(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addBenefit}
                      className="mt-2 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                </div>

                {/* Application Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Application Settings</h3>

                  <div>
                    <Label htmlFor="applicationDeadline">Application Deadline</Label>
                    <Input id="applicationDeadline" type="date" />
                  </div>

                  <div>
                    <Label htmlFor="startDate">Preferred Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="urgent" />
                      <Label htmlFor="urgent">This is an urgent position</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">Make this a featured job (+$50)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="emailUpdates" />
                      <Label htmlFor="emailUpdates">Send me email updates about applications</Label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-6">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent">
                    Save as Draft
                  </Button>
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Post Job
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
