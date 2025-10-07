import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock, Dumbbell, CheckCircle } from "lucide-react"
import { LAGREE_RATE_HINT } from "@/lib/lagree"

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
              <Badge variant="secondary" className="text-xs">Lagree AU</Badge>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">How it Works</Link>
              <Link href="#for-studios" className="text-gray-600 hover:text-orange-500 transition-colors">For Studios</Link>
              <Link href="#for-instructors" className="text-gray-600 hover:text-orange-500 transition-colors">For Instructors</Link>
              <Link href="#browse-jobs" className="text-gray-600 hover:text-orange-500 transition-colors">Browse Jobs</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild><Link href="/login">Sign In</Link></Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600"><Link href="/register">Get Started</Link></Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Australia’s marketplace for
            <span className="text-orange-500 block">Lagree Instructors & Studios</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find certified Megaformer/Microformer coaches, manage class covers, and hire faster with a Lagree-specific talent pool.
          </p>

          {/* Search */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-lg shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by Lagree level, equipment (M3K/M4/Micro), suburb…"
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
            <div className="text-center"><div className="text-4xl font-bold text-orange-500 mb-2">250+</div><div className="text-gray-600">Lagree Instructors</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-orange-500 mb-2">90+</div><div className="text-gray-600">Lagree Studios</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-orange-500 mb-2">600+</div><div className="text-gray-600">Successful Matches</div></div>
          </div>
        </div>
      </section>

      {/* How It Works (unchanged structure, Lagree copy) */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Built specifically for Lagree hiring & covers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div id="for-studios">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Lagree Studios</h3>
              <div className="space-y-6">
                <Step n={1} title="Create Your Studio Profile" body="Showcase equipment (M3K/M4/Micro), class formats, and brand." />
                <Step n={2} title="Post Jobs & Covers" body="Specify level (L1/L2), equipment, schedule, rate & prerequisites." />
                <Step n={3} title="Review & Book" body="Browse verified Lagree coaches and confirm quickly." />
              </div>
            </div>

            <div id="for-instructors">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Lagree Instructors</h3>
              <div className="space-y-6">
                <Step n={1} title="Build Your Lagree Profile" body="Add certifications (L1/L2), equipment experience, and videos." />
                <Step n={2} title="Set Availability" body="Covers, recurring classes, privates—set your preferences." />
                <Step n={3} title="Apply & Get Hired" body="Apply to opportunities with transparent rates and details." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities (Lagree samples) */}
      <section id="browse-jobs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Lagree Roles</h2>
            <p className="text-xl text-gray-600">Latest Megaformer & Microformer postings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                studio: "CoreLagree Melbourne",
                title: "Lagree Instructor (L1)",
                location: "Melbourne CBD, VIC",
                type: "Casual / Cover",
                rate: LAGREE_RATE_HINT,
                requirements: ["Lagree Level 1", "Megaformer (M3K) experience"],
                schedule: "Tue/Thu 6:00 AM • Sat 9:00 AM",
              },
              {
                studio: "Bondi Mega Co.",
                title: "Senior Lagree Coach (L2)",
                location: "Bondi, NSW",
                type: "Part-time",
                rate: "$90–120/class",
                requirements: ["Lagree Level 2", "Programming advanced series"],
                schedule: "Evenings + Sunday AM",
              },
              {
                studio: "Microformer Lab",
                title: "Lagree Coach – Microformer",
                location: "South Yarra, VIC",
                type: "Contract",
                rate: "$80–100/class",
                requirements: ["Lagree L1", "Microformer setup & cues"],
                schedule: "Weeknights",
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
              <Link href="/jobs">View All Lagree Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Hire Certified Lagree Instructors</h2>
              <p className="text-xl mb-6 text-orange-100">Post roles and covers with equipment & level requirements.</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register?type=studio">Post a Lagree Job</Link>
              </Button>
            </div>
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Grow Your Lagree Career</h2>
              <p className="text-xl mb-6 text-orange-100">Showcase your L1/L2, equipment experience, and availability.</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register?type=instructor">Create Lagree Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (unchanged structure) */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* ... keep your existing footer content ... */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InstructorConnect.com.au. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{n}</div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{body}</p>
      </div>
    </div>
  )
}
