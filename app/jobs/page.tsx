"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Clock, DollarSign, Filter, Heart, Dumbbell, CheckCircle, Building2 } from "lucide-react"

export default function JobsPage() {
  const [showFilters, setShowFilters] = useState(false)

  const jobs = [
    {
      id: 1,
      title: "Senior Yoga Instructor",
      studio: "Zen Flow Studio",
      location: "Melbourne CBD, VIC",
      type: "Part-time",
      rate: "$75-90/class",
      posted: "2 days ago",
      description: "We're seeking an experienced yoga instructor to lead our morning and evening classes...",
      requirements: ["500hr YTT", "3+ years experience", "Vinyasa & Hatha", "First Aid Certified"],
      schedule: "Mon-Fri: 6:30 AM & 7:00 PM",
      featured: true,
      saved: false,
    },
    {
      id: 2,
      title: "Personal Trainer - Strength Focus",
      studio: "Iron Temple Gym",
      location: "Bondi Beach, NSW",
      type: "Full-time",
      rate: "$80-100/session",
      posted: "1 day ago",
      description: "Join our team of elite personal trainers specializing in strength and conditioning...",
      requirements: ["Cert IV Fitness", "Strength specialist", "Nutrition knowledge", "2+ years PT experience"],
      schedule: "Flexible - 30+ hours/week",
      featured: false,
      saved: true,
    },
    {
      id: 3,
      title: "Group Fitness Instructor",
      studio: "FitLife Community Center",
      location: "Brisbane, QLD",
      type: "Casual",
      rate: "$60-75/class",
      posted: "3 days ago",
      description: "Looking for energetic instructors to lead HIIT, Zumba, and circuit training classes...",
      requirements: ["Group Fitness Cert", "High energy", "Music mixing skills", "Injury prevention"],
      schedule: "Weekends & evenings",
      featured: false,
      saved: false,
    },
    {
      id: 4,
      title: "Pilates Instructor - Reformer",
      studio: "Core Pilates Studio",
      location: "South Yarra, VIC",
      type: "Part-time",
      rate: "$85-110/class",
      posted: "5 days ago",
      description: "Experienced reformer pilates instructor needed for our boutique studio...",
      requirements: ["Comprehensive Pilates", "Reformer certified", "Anatomy knowledge", "1+ years experience"],
      schedule: "Tue, Thu, Sat mornings",
      featured: true,
      saved: false,
    },
    {
      id: 5,
      title: "Aqua Fitness Instructor",
      studio: "AquaFit Health Club",
      location: "Gold Coast, QLD",
      type: "Part-time",
      rate: "$65-80/class",
      posted: "1 week ago",
      description: "Join our aquatic fitness team and help members achieve their goals in the water...",
      requirements: ["Aqua Fitness Cert", "Swimming proficiency", "Senior population experience", "CPR certified"],
      schedule: "Mon, Wed, Fri - 9:00 AM",
      featured: false,
      saved: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jobs" className="text-orange-500 font-medium">
                Browse Jobs
              </Link>
              <Link href="/instructors" className="text-gray-600 hover:text-orange-500">
                Find Instructors
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-orange-500">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/register">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Location */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="nsw">New South Wales</SelectItem>
                      <SelectItem value="vic">Victoria</SelectItem>
                      <SelectItem value="qld">Queensland</SelectItem>
                      <SelectItem value="wa">Western Australia</SelectItem>
                      <SelectItem value="sa">South Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Job Type</Label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Casual", "Contract"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fitness Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Fitness Type</Label>
                  <div className="space-y-2">
                    {["Yoga", "Pilates", "Personal Training", "Group Fitness", "Aqua Fitness", "Strength Training"].map(
                      (type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <Label htmlFor={type} className="text-sm">
                            {type}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Pay Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Pay Range (per class/session)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any rate</SelectItem>
                      <SelectItem value="50-70">$50-70</SelectItem>
                      <SelectItem value="70-90">$70-90</SelectItem>
                      <SelectItem value="90-110">$90-110</SelectItem>
                      <SelectItem value="110+">$110+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search jobs, studios, or keywords..." className="pl-10" />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input placeholder="Location" className="pl-10 md:w-48" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fitness Jobs</h1>
                <p className="text-gray-600">{jobs.length} opportunities found</p>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by: Most Recent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary-high">Highest Pay</SelectItem>
                  <SelectItem value="salary-low">Lowest Pay</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={`hover:shadow-lg transition-shadow ${job.featured ? "ring-2 ring-orange-200" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          {job.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span className="font-medium text-orange-600">{job.studio}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.rate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.schedule}
                          </div>
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className={job.saved ? "text-red-500" : "text-gray-400"}>
                        <Heart className={`h-5 w-5 ${job.saved ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {job.requirements.map((req, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save Job
                        </Button>
                        <Button variant="outline" size="sm">
                          Share
                        </Button>
                      </div>
                      <Button className="bg-orange-500 hover:bg-orange-600">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
