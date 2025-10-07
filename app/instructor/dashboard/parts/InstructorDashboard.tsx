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
  const instructorStats = { profileViews: 156, applicationsSubmitted: 8, interviewsScheduled: 3, jobsApplied: 12 }

  const recentApplications = [
    { id: 1, jobTitle: "Lagree Instructor (L1)", studio: "CoreLagree Melbourne", location: "Melbourne CBD, VIC", appliedDate: "2 days ago", status: "Under Review", rate: "$90-110/class" },
    { id: 2, jobTitle: "Senior Lagree Coach (L2)", studio: "Bondi Mega Co.", location: "Bondi, NSW", appliedDate: "5 days ago", status: "Interview Scheduled", rate: "$100-120/class" },
  ]

  const upcomingInterviews = [
    { id: 1, studio: "CoreLagree Melbourne", position: "Lagree Instructor (L1)", date: "Tomorrow", time: "2:00 PM", type: "Video Call" },
  ]

  const savedJobs = [
    { id: 1, title: "Lagree Coach — Microformer", studio: "Microformer Lab", location: "South Yarra, VIC", rate: "$80-100/class", posted: "3 days ago" },
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
              <Link href="/instructor/dashboard" className="text-orange-500 font-medium">Dashboard</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-orange-500">Browse Jobs</Link>
              <Link href="/post-availability" className="text-gray-600 hover:text-orange-500">Post Availability</Link>
              <Link href="/messages" className="text-gray-600 hover:text-orange-500">Messages</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Bell className="h-5 w-5" /></Button>
              <Button variant="ghost" size="sm"><Settings className="h-5 w-5" /></Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Track your Lagree career: availability, jobs, applications, and interviews.</p>
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
            <div className="mt-4 flex items-center text-sm text-gray-600">This month</div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{instructorStats.interviewsScheduled}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-green-600" /></div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">Scheduled</div>
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

        {/* Main Content */}
        <Tabs defaultValue="availability" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="availability">My Availability</TabsTrigger>
            <TabsTrigger value="jobs">Recommended Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          {/* Availability */}
          <TabsContent value="availability" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Availability</h2>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/post-availability"><Plus className="h-4 w-4 mr-2" />Post Availability</Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 text-gray-600">
                Your upcoming availability posts show here (date, window, location, rate). Studios can DM you directly.
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs */}
          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardContent className="p-6 text-gray-600">
                Job recommendations (by level L1/L2 & equipment M3K/M4/Micro) show here.
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/jobs"><Plus className="h-4 w-4 mr-2" />Apply to More Jobs</Link>
              </Button>
            </div>

            <div className="space-y-4">
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
                        <Badge
                          variant={
                            application.status === "Interview Scheduled"
                              ? "default"
                              : application.status === "Under Review"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            application.status === "Interview Scheduled"
                              ? "bg-green-500"
                              : application.status === "Under Review"
                              ? "bg-yellow-500"
                              : ""
                          }
                        >
                          {application.status}
                        </Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interviews */}
          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardContent className="p-6 text-gray-600">
                Upcoming interviews with join/reschedule + DM thread.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
