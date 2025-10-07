"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Dumbbell,
  Search,
  MapPin,
  Filter,
  MessageSquare,
  Calendar,
  Eye,
  BadgeCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --- Types (Lagree-only) ---
type Level = "L1" | "L2" | "L3"
type Equip = "M3K" | "M4" | "Micro" | "MegaPro" | "MicroPro" | "Mini" | "MiniPro"

type Instructor = {
  id: string              // instructors table PK (or demo id)
  userId?: string         // auth.users.id (needed for DM). Optional for demo data.
  name: string
  location: string
  level: Level
  equipment: Equip[]
  rate: string
  bio: string
  verified?: boolean
}

// --- Demo data ---
const INSTRUCTORS: Instructor[] = [
  {
    id: "i1",
    userId: "demo-user-1", // remove once you wire real IDs
    name: "Jessica D.",
    location: "Melbourne CBD, VIC",
    level: "L2",
    equipment: ["M3K", "M4", "MegaPro"],
    rate: "$95–120/class",
    bio: "Senior Lagree coach, advanced programming, AM covers + Sundays.",
    verified: true,
  },
  {
    id: "i2",
    userId: "demo-user-2",
    name: "Kai P.",
    location: "Bondi, NSW",
    level: "L1",
    equipment: ["M3K", "Micro"],
    rate: "$80–100/class",
    bio: "Microformer + Megaformer. Evenings / weekends.",
  },
  {
    id: "i3",
    // no userId -> Contact/Interview will show an alert until you provide real IDs
    name: "Sienna R.",
    location: "South Yarra, VIC",
    level: "L3",
    equipment: ["MegaPro", "M4"],
    rate: "$110–140/class",
    bio: "Advanced series, mentor juniors, rapid cover response.",
    verified: true,
  },
]

// --- Page ---
export default function BrowseInstructorsPage() {
  // filters
  const [q, setQ] = useState("")
  const [loc, setLoc] = useState("")
  const [level, setLevel] = useState<"any" | Level>("any")
  const [equip, setEquip] = useState<"any" | Equip>("any")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return INSTRUCTORS.filter((i) => {
      if (q && !(i.name + i.bio).toLowerCase().includes(q.toLowerCase())) return false
      if (loc && !i.location.toLowerCase().includes(loc.toLowerCase())) return false
      if (level !== "any" && i.level !== level) return false
      if (equip !== "any" && !i.equipment.includes(equip)) return false
      return true
    })
  }, [q, loc, level, equip])

  const resetFilters = () => {
    setQ("")
    setLoc("")
    setLevel("any")
    setEquip("any")
  }

  const contactHref = (userId?: string) =>
    userId ? `/messages/new?to=${userId}` : undefined

  const interviewHref = (userId?: string, name?: string) =>
    userId
      ? `/messages/new?to=${userId}&prefill=${encodeURIComponent(
          `Hi ${name ?? ""}! Are you available for a 20-minute interview this week?`
        )}`
      : undefined

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

            {/* Studio-focused nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/post-job" className="text-gray-600 hover:text-orange-500">Post Job</Link>
              <Link href="/browse-instructors" className="text-orange-500 font-medium">Find Instructors</Link>
              <Link href="/dashboard?type=studio" className="text-gray-600 hover:text-orange-500">Dashboard</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button asChild variant="outline"><Link href="/login">Sign In</Link></Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/post-job">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Lagree Instructors</h1>
          <p className="text-gray-600">Filter by level, equipment, and location. Message candidates or schedule an interview.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters((s) => !s)}
                    className="lg:hidden"
                    aria-expanded={showFilters}
                    aria-controls="filters-content"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent id="filters-content" className={`space-y-5 ${showFilters ? "block" : "hidden lg:block"}`}>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by name, bio…"
                    className="pl-10"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    aria-label="Search"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Location"
                    className="pl-10"
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    aria-label="Location"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Lagree Level</Label>
                  <Select value={level} onValueChange={(v: any) => setLevel(v)}>
                    <SelectTrigger><SelectValue placeholder="Any level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="L1">L1</SelectItem>
                      <SelectItem value="L2">L2</SelectItem>
                      <SelectItem value="L3">L3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Equipment</Label>
                  <Select value={equip} onValueChange={(v: any) => setEquip(v)}>
                    <SelectTrigger><SelectValue placeholder="Any equipment" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="M3K">M3K</SelectItem>
                      <SelectItem value="M4">M4</SelectItem>
                      <SelectItem value="Micro">Micro</SelectItem>
                      <SelectItem value="MegaPro">MegaPro</SelectItem>
                      <SelectItem value="MicroPro">MicroPro</SelectItem>
                      <SelectItem value="Mini">Mini</SelectItem>
                      <SelectItem value="MiniPro">MiniPro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(q || loc || level !== "any" || equip !== "any") && (
                  <Button variant="ghost" size="sm" className="bg-transparent" onClick={resetFilters}>
                    Clear all
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <section className="flex-1">
            {filtered.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No instructors match your filters</h3>
                  <p className="text-gray-600 mb-4">Try clearing filters or widening your location.</p>
                  <Button variant="outline" onClick={resetFilters}>Reset filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filtered.map((i) => (
                  <Card key={i.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback>{i.name.slice(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-semibold">{i.name}</div>
                              {i.verified && (
                                <Badge className="bg-green-100 text-green-700">
                                  <BadgeCheck className="h-4 w-4 mr-1" /> Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-gray-600 mt-1">
                              <span className="inline-flex items-center">
                                <MapPin className="h-4 w-4 mr-1" /> {i.location}
                              </span>
                              <Badge variant="secondary">Level {i.level}</Badge>
                              <div className="flex flex-wrap gap-2">
                                {i.equipment.map((e) => (
                                  <Badge key={`${i.id}-${e}`} variant="outline">{e}</Badge>
                                ))}
                              </div>
                              <span className="text-sm">{i.rate}</span>
                            </div>
                            <p className="text-gray-700 mt-3">{i.bio}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {/* CONTACT (DM) */}
                          {contactHref(i.userId) ? (
                            <Button asChild variant="outline">
                              <Link href={contactHref(i.userId)!}>
                                <MessageSquare className="h-4 w-4 mr-2" /> Contact
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => alert("This is demo data. Connect real userId to enable DMs.")}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" /> Contact
                            </Button>
                          )}

                          {/* SCHEDULE INTERVIEW (prefilled DM) */}
                          {interviewHref(i.userId, i.name) ? (
                            <Button asChild variant="outline">
                              <Link href={interviewHref(i.userId, i.name)!}>
                                <Calendar className="h-4 w-4 mr-2" /> Schedule Interview
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => alert("This is demo data. Connect real userId to enable interview messages.")}
                            >
                              <Calendar className="h-4 w-4 mr-2" /> Schedule Interview
                            </Button>
                          )}

                          {/* VIEW PROFILE */}
                          <Button asChild className="bg-orange-500 hover:bg-orange-600">
                            <Link href={`/instructors/${i.id}`}>
                              <Eye className="h-4 w-4 mr-2" /> View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
