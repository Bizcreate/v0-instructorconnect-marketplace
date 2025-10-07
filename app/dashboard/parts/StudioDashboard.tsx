"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Plus, Eye, MessageSquare, Calendar, MapPin, Star, Settings, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudioDashboard() {
  // Studio-facing stats and data
  const studioStats = { jobsOpen: 4, applicants: 23, interviews: 5, hiresThisMonth: 2 }
  const studioJobs = [
    { id: 101, title: "Lagree Instructor (L1) — AM Covers", location: "South Yarra, VIC", applicants: 7, status: "Open" },
    { id: 102, title: "Senior Lagree Coach (L2)", location: "Bondi, NSW", applicants: 9, status: "Open" },
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
              {/* Studio nav: Post Job + Find Instructors (no availability) */}
              <Link href="/post-job" className="text-gray-600 hover:text-orange-500">Post Job</Link>
              <Link href="/browse-instructors" className="text-gray-600 hover:text-orange-500">Find Instructors</Link>
              <Link href="/dashboard?type=studio" className="text-orange-500 font-medium">Dashboard</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Bell className="h-5 w-5" /></Button>
              <Button variant="ghost" size="sm"><Settings className="h-5 w-5" /></Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Studio!</h1>
          <p className="text-gray-600">Post roles/covers, manage applicants, and hire certified Lagree coaches.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-600">Jobs Open</p><p className="text-3xl font-bold text-gray-900">{studioStats.jobsOpen}</p></div>
              <div className="bg-blue-100 p-3 rounded-full"><Eye className="h-6 w-6 text-blue-600" /></div>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-600">Applicants</p><p className="text-3xl font-bold text-gray-900">{studioStats.applicants}</p></div>
              <div className="bg-orange-100 p-3 rounded-full"><MessageSquare className="h-6 w-6 text-orange-600" /></div>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-600">Interviews</p><p className="text-3xl font-bold text-gray-900">{studioStats.interviews}</p></div>
              <div className="bg-green-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-green-600" /></div>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-600">Hires (30d)</p><p className="text-3xl font-bold text-gray-900">{studioStats.hiresThisMonth}</p></div>
              <div className="bg-purple-100 p-3 rounded-full"><Star className="h-6 w-6 text-purple-600" /></div>
            </div>
          </CardContent></Card>
        </div>

        {/* Main – tailored for studios */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Jobs Posted</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          {/* Jobs Posted */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Lagree Roles</h2>
              <div className="flex gap-2">
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/post-job"><Plus className="h-4 w-4 mr-2" />Post Job</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/browse-instructors">Find Instructors</Link>
                </Button>
              </div>
            </div>

            {studioJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <Badge variant="secondary">{job.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-100 text-orange-700">{job.applicants} applicants</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Applicants */}
          <TabsContent value="applicants">
            <Card>
              <CardContent className="p-6 text-gray-600">
                Applicant list & filters (by job, stage, rating) will go here.
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews */}
          <TabsContent value="interviews">
            <Card>
              <CardContent className="p-6 text-gray-600">
                Interview schedule & links will go here.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
