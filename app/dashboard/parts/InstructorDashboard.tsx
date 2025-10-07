"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dumbbell, Plus, Eye, MessageSquare, Calendar, MapPin, Clock,
  DollarSign, TrendingUp, Star, Settings, Bell,
} from "lucide-react"

export default function InstructorDashboard() {
  // Demo data (keep your originals, just reworded to Lagree where needed)
  const instructorStats = { profileViews: 156, applicationsSubmitted: 8, interviewsScheduled: 3, jobsApplied: 12 }

  const recentApplications = [
    { id: 1, jobTitle: "Lagree Coach (L1)", studio: "CoreLagree Melbourne", location: "Melbourne CBD, VIC", appliedDate: "2 days ago", status: "Under Review", rate: "$90-110/class" },
    { id: 2, jobTitle: "Senior Lagree Coach (L2)", studio: "Bondi Mega Co.", location: "Bondi, NSW", appliedDate: "5 days ago", status: "Interview Scheduled", rate: "$100-120/class" },
  ]

  const upcomingInterviews = [
    { id: 1, studio: "CoreLagree Melbourne", position: "Lagree Coach (L1)", date: "Tomorrow", time: "2:00 PM", type: "Video Call" },
    { id: 2, studio: "Microformer Lab", position: "Lagree — Microformer", date: "Friday", time: "10:00 AM", type: "In-Person" },
  ]

  const savedJobs = [
    { id: 1, title: "Lagree Coach (Cover)", studio: "Lagree South", location: "South Yarra, VIC", rate: "$80-95/class", posted: "3 days ago" },
    { id: 2, title: "Lagree Coach (Megaformer)", studio: "MegaPro Studio", location: "Sydney, NSW", rate: "$90-110/class", posted: "1 week ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {/* Instructor nav: browse jobs + post availability (no “find instructors”, no “post job”) */}
              <Link href="/jobs" className="text-gray-600 hover:text-orange-500">Browse Jobs</Link>
              <Link href="/post-availability" className="text-gray-600 hover:text-orange-500">Post Availability</Link>
              <Link href="/dashboard?type=instructor" className="text-orange-500 font-medium">Dashboard</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Bell className="h-5 w-5" /></Button>
              <Button variant="ghost" size="sm"><Settings className="h-5 w-5" /></Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Find Lagree shifts, post your availability, and manage applications.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.profileViews}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full"><Eye className="h-6 w-6 text-blue-600" /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" /> +12% from last week
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.applicationsSubmitted}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full"><MessageSquare className="h-6 w-6 text-orange-600" /></div>
            </div>
            <div className="mt-4 text-sm text-gray-600">This month</div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.interviewsScheduled}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-green-600" /></div>
            </div>
            <div className="mt-4 text-sm text-gray-600">Scheduled</div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">67%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full"><Star className="h-6 w-6 text-purple-600" /></div>
            </div>
            <div className="mt-4"><Progress value={67} className="h-2" /></div>
          </CardContent></Card>
        </div>

        {/* Main Content – tailored for instructors */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <div className="flex gap-2">
                <Button asChild variant="outline"><Link href="/jobs">Browse Jobs</Link></Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/post-availability"><Plus className="h-4 w-4 mr-2" />Post Availability</Link>
                </Button>
              </div>
            </div>

            {recentApplications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
                      <div className="flex items-center gap-4 text-gray-600 mb-2">
                        <span className="font-medium text-orange-600">{application.studio}</span>
                        <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{application.location}</div>
                        <div className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{application.rate}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Applied {application.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        application.status === "Interview Scheduled"
                          ? "bg-green-500"
                          : application.status === "Under Review"
                          ? "bg-yellow-500"
                          : ""
                      }>
                        {application.status}
                      </Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Interviews */}
          <TabsContent value="interviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
              <Button variant="outline" asChild>
                <Link href="/calendar"><Calendar className="h-4 w-4 mr-2" />View Calendar</Link>
              </Button>
            </div>

            {upcomingInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{interview.position}</h3>
                      <p className="text-orange-600 font-medium mb-2">{interview.studio}</p>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{interview.date}</div>
                        <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{interview.time}</div>
                        <Badge variant="outline">{interview.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Join Interview</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Availability */}
          <TabsContent value="availability" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Availability</h2>
              <div className="flex gap-2">
                <Button asChild variant="outline"><Link href="/availability">Manage</Link></Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/post-availability"><Plus className="h-4 w-4 mr-2" />Post Availability</Link>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 text-gray-600">
                Calendar & posted availability will appear here (by week/month).
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Profile Overview</h2>
              <Button variant="outline" asChild><Link href="/profile/edit">Edit Profile</Link></Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription>Complete your profile to increase hire rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">Profile Photo</span><Badge variant="secondary">Complete</Badge></div>
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">Bio</span><Badge variant="secondary">Complete</Badge></div>
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">Lagree Certification</span><Badge className="bg-orange-500">Incomplete</Badge></div>
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">Availability</span><Badge variant="secondary">Complete</Badge></div>
                    <div className="flex items-center justify-between"><span className="text-sm font-medium">Media (Videos)</span><Badge className="bg-orange-500">Incomplete</Badge></div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Completion</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent"><Plus className="h-4 w-4 mr-2" />Add Certification</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent"><Calendar className="h-4 w-4 mr-2" />Update Availability</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent"><Eye className="h-4 w-4 mr-2" />Preview Profile</Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent"><Settings className="h-4 w-4 mr-2" />Account Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
