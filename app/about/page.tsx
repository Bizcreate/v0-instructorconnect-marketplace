import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Users, Target, Heart, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Active Instructors", value: "500+", icon: Users },
    { label: "Partner Studios", value: "150+", icon: Dumbbell },
    { label: "Successful Matches", value: "1000+", icon: Target },
    { label: "Cities Covered", value: "25+", icon: TrendingUp },
  ]

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      bio: "Former fitness studio owner with 10+ years in the industry",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "James Chen",
      role: "Head of Product",
      bio: "Tech entrepreneur passionate about connecting communities",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Community",
      bio: "Certified fitness instructor and community builder",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
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
              <Link href="/browse-instructors" className="text-gray-600 hover:text-orange-500">
                Find Instructors
              </Link>
              <Link href="/about" className="text-orange-500 font-medium">
                About
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
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About InstructorConnect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to revolutionize how fitness studios and instructors connect across Australia. Building
            stronger communities, one connection at a time.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">Proudly Australian 🇦🇺</Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-orange-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Story</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem We Saw</h3>
                <p className="text-gray-600 mb-6">
                  As a former fitness studio owner, our founder Sarah experienced firsthand the challenges of finding
                  qualified instructors. Traditional job boards weren't built for the fitness industry, and the hiring
                  process was time-consuming and inefficient.
                </p>
                <p className="text-gray-600">
                  Meanwhile, talented instructors struggled to find opportunities that matched their skills,
                  availability, and career goals. There had to be a better way.
                </p>
              </div>
              <div className="bg-orange-100 p-8 rounded-lg">
                <Heart className="h-12 w-12 text-orange-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h4>
                <p className="text-gray-600">
                  To create meaningful connections between fitness professionals and studios, fostering a stronger, more
                  connected fitness community across Australia.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-50 p-8 rounded-lg">
                <Award className="h-12 w-12 text-orange-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Community-first approach</li>
                  <li>• Transparency in all interactions</li>
                  <li>• Supporting professional growth</li>
                  <li>• Celebrating diversity in fitness</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Solution We Built</h3>
                <p className="text-gray-600 mb-6">
                  InstructorConnect was born from this need - a specialized platform designed specifically for the
                  fitness industry. We understand the unique requirements of fitness professionals and the specific
                  needs of studios.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to be Australia's leading fitness job marketplace, connecting hundreds of studios
                  with thousands of qualified instructors nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate fitness professionals and tech experts working together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Whether you're a studio looking for talent or an instructor seeking opportunities, we're here to help you
            succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?type=studio">I'm a Studio</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?type=instructor">I'm an Instructor</Link>
            </Button>
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
              <p className="text-gray-400 mb-4">Connecting Australia's fitness community</p>
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
                  <Link href="/register" className="hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/career-advice" className="hover:text-white">
                    Career Advice
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
