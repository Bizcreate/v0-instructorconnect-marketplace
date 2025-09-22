"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Star, MessageSquare, Calendar, Dumbbell, Filter } from "lucide-react"

export default function BrowseInstructorsPage() {
  const [showFilters, setShowFilters] = useState(false)

  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialties: ["Yoga", "Pilates", "Meditation"],
      location: "Melbourne, VIC",
      experience: "5+ years",
      rating: 4.9,
      reviews: 127,
      rate: "$80-100/session",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Certified yoga instructor with expertise in Vinyasa and Hatha yoga. Passionate about helping clients find balance...",
      certifications: ["500hr YTT", "Pilates Mat Certified", "First Aid"],
      availability: "Mon-Fri mornings, Weekend evenings",
      featured: true,
    },
    {
      id: 2,
      name: "Marcus Chen",
      specialties: ["Personal Training", "Strength Training", "HIIT"],
      location: "Sydney, NSW",
      experience: "8+ years",
      rating: 4.8,
      reviews: 203,
      rate: "$90-120/session",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Elite personal trainer specializing in strength and conditioning. Former competitive athlete...",
      certifications: ["Cert IV Fitness", "Strength & Conditioning", "Nutrition Cert"],
      availability: "Flexible schedule",
      featured: false,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      specialties: ["Lagree", "Barre", "Group Fitness"],
      location: "Brisbane, QLD",
      experience: "4+ years",
      rating: 4.9,
      reviews: 89,
      rate: "$75-95/session",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Lagree specialist with a passion for high-intensity, low-impact workouts. Certified in multiple disciplines...",
      certifications: ["Lagree Certified", "Barre Instructor", "Group Fitness"],
      availability: "Weekdays & weekends",
      featured: true,
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
              <Link href="/jobs" className="text-gray-600 hover:text-orange-500">
                Browse Jobs
              </Link>
              <Link href="/browse-instructors" className="text-orange-500 font-medium">
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
                <Link href="/register">Get Started</Link>
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
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Specialties</Label>
                  <div className="space-y-2">
                    {["Yoga", "Pilates", "Lagree", "Personal Training", "Group Fitness", "HIIT"].map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox id={specialty} />
                        <Label htmlFor={specialty} className="text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any experience</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Instructor Listings */}
          <div className="flex-1">
            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search instructors by name or specialty..." className="pl-10" />
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
                <h1 className="text-2xl font-bold text-gray-900">Browse Instructors</h1>
                <p className="text-gray-600">{instructors.length} qualified instructors found</p>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by: Highest Rated" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="rate">Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Instructor Cards */}
            <div className="space-y-6">
              {instructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className={`hover:shadow-lg transition-shadow ${instructor.featured ? "ring-2 ring-orange-200" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                              {instructor.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                            </div>
                            <div className="flex items-center gap-4 text-gray-600 mb-2">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {instructor.location}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                                {instructor.rating} ({instructor.reviews} reviews)
                              </div>
                              <span>{instructor.experience}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {instructor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-green-600 mb-1">{instructor.rate}</div>
                            <div className="text-sm text-gray-500">per session</div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{instructor.bio}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Certifications:</h4>
                            <div className="space-y-1">
                              {instructor.certifications.map((cert, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                  • {cert}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Availability:</h4>
                            <p className="text-sm text-gray-600">{instructor.availability}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button className="bg-orange-500 hover:bg-orange-600">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button variant="outline">View Full Profile</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Instructors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
