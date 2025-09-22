import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock, Dumbbell, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">InstructorConnect</span>
              <Badge variant="secondary" className="text-xs">
                AU
              </Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">
                How it Works
              </Link>
              <Link href="#for-studios" className="text-gray-600 hover:text-orange-500 transition-colors">
                For Studios
              </Link>
              <Link href="#for-instructors" className="text-gray-600 hover:text-orange-500 transition-colors">
                For Instructors
              </Link>
              <Link href="#browse-jobs" className="text-gray-600 hover:text-orange-500 transition-colors">
                Browse Jobs
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Fitness Studios with
            <span className="text-orange-500 block">Qualified Instructors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Australia's premier marketplace for fitness professionals. Find your perfect instructor or discover your
            next opportunity in the fitness industry.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-lg shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by class type, location, or instructor name..."
                  className="pl-10 border-0 focus-visible:ring-0 text-lg h-12"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Location" className="pl-10 border-0 focus-visible:ring-0 text-lg h-12 md:w-48" />
              </div>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 h-12 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Active Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">150+</div>
              <div className="text-gray-600">Partner Studios</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">1000+</div>
              <div className="text-gray-600">Successful Matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How InstructorConnect Works</h2>
            <p className="text-xl text-gray-600">Simple, efficient, and designed for the fitness industry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* For Studios */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Fitness Studios</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Create Your Studio Profile</h4>
                    <p className="text-gray-600">Showcase your facility, values, and what makes your studio unique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Post Job Requirements</h4>
                    <p className="text-gray-600">Specify class types, schedules, qualifications, and compensation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Review & Connect</h4>
                    <p className="text-gray-600">Browse instructor profiles and connect with the perfect fit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Instructors */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Fitness Instructors</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Build Your Profile</h4>
                    <p className="text-gray-600">Upload your CV, certifications, and showcase your expertise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Set Your Availability</h4>
                    <p className="text-gray-600">Manage your schedule and preferred locations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Apply & Get Hired</h4>
                    <p className="text-gray-600">Apply to opportunities that match your skills and schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600">Latest job postings from top fitness studios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                studio: "FitCore Melbourne",
                title: "Yoga Instructor",
                location: "Melbourne CBD, VIC",
                type: "Part-time",
                rate: "$65-80/class",
                requirements: ["200hr YTT", "2+ years experience"],
                schedule: "Mon, Wed, Fri - 6:30 AM",
              },
              {
                studio: "Strength & Conditioning Co.",
                title: "Personal Trainer",
                location: "Bondi Beach, NSW",
                type: "Full-time",
                rate: "$70-90/session",
                requirements: ["Cert IV Fitness", "Strength specialist"],
                schedule: "Flexible hours",
              },
              {
                studio: "Pilates Plus",
                title: "Pilates Instructor",
                location: "South Yarra, VIC",
                type: "Casual",
                rate: "$75-95/class",
                requirements: ["Comprehensive Pilates", "Mat & Reformer"],
                schedule: "Weekends available",
              },
            ].map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="font-medium text-orange-600">{job.studio}</CardDescription>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.schedule}
                    </div>
                    <div className="text-lg font-semibold text-green-600">{job.rate}</div>
                    <div className="space-y-1">
                      {job.requirements.map((req, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                          {req}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Instructor?</h2>
              <p className="text-xl mb-6 text-orange-100">
                Join hundreds of fitness studios already using InstructorConnect to find qualified professionals.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register?type=studio">Post a Job - Free</Link>
              </Button>
            </div>
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Advance Your Fitness Career</h2>
              <p className="text-xl mb-6 text-orange-100">
                Discover opportunities at top fitness studios across Australia and build your professional network.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register?type=instructor">Create Your Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">InstructorConnect</span>
              </div>
              <p className="text-gray-400 mb-4">Connecting Australia's fitness community, one instructor at a time.</p>
              <div className="text-sm text-gray-400">
                <p>📧 hello@instructorconnect.com.au</p>
                <p>📞 1300 FIT JOBS</p>
                <p>📍 Melbourne, Australia</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Studios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-job" className="hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/browse-instructors" className="hover:text-white">
                    Browse Instructors
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/studio-resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Instructors</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/create-profile" className="hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/career-advice" className="hover:text-white">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="/instructor-resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InstructorConnect.com.au. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
