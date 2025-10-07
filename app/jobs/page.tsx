"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Dumbbell,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Heart,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Supabase (browser) client
import { createClient as createSbClient } from "@/lib/supabase/client"

// ---------------- Types ----------------
type JobKind = "Full-time" | "Part-time" | "Casual" | "Contract" | "Cover"

type Job = {
  id: number
  title: string
  studio: string
  location: string
  kind: JobKind
  rate: string              // e.g. "$90-110/class"
  posted: string            // e.g. "2 days ago"
  description: string
  schedule: string
  featured?: boolean
}

// ---------------- Demo data ----------------
const JOBS: Job[] = [
  {
    id: 1,
    title: "Lagree Instructor (L1)",
    studio: "CoreLagree Melbourne",
    location: "Melbourne CBD, VIC",
    kind: "Part-time",
    rate: "$90-110/class",
    posted: "2 days ago",
    description: "Coach morning Megaformer classes (L1). Programming provided.",
    schedule: "Mon–Thu 6:00 AM, Sat 9:00 AM",
    featured: true,
  },
  {
    id: 2,
    title: "Senior Lagree Coach (L2)",
    studio: "Bondi Mega Co.",
    location: "Bondi, NSW",
    kind: "Full-time",
    rate: "$100-120/class",
    posted: "1 day ago",
    description: "Lead advanced series, mentor junior coaches.",
    schedule: "Evenings + Sun AM",
  },
  {
    id: 3,
    title: "Lagree — Microformer",
    studio: "Microformer Lab",
    location: "South Yarra, VIC",
    kind: "Contract",
    rate: "$80-100/class",
    posted: "5 days ago",
    description: "Microformer studio seeking experienced coach for weeknights.",
    schedule: "Weeknights",
  },
]

// ---------------- Helpers ----------------
const JOB_TYPES: JobKind[] = ["Full-time", "Part-time", "Casual", "Contract", "Cover"]
const PAY_PRESETS = [
  { value: "any", label: "Any rate" },
  { value: "90+", label: "$90+" },
  { value: "100+", label: "$100+" },
] as const

function rateMinNumber(rate: string) {
  const m = rate.match(/\$?(\d+)/)
  return m ? Number(m[1]) : 0
}

// ---------------- Page ----------------
export default function JobsPage() {
  const sb = useMemo(() => createSbClient(), [])
  const [role, setRole] = useState<"STUDIO" | "INSTRUCTOR" | null>(null)

  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [q, setQ] = useState("")
  const [loc, setLoc] = useState("")
  const [pay, setPay] = useState<(typeof PAY_PRESETS)[number]["value"]>("any")
  const [kinds, setKinds] = useState<Set<JobKind>>(new Set())
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)

  // Load user role from Supabase -> profiles.role
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data: { user } } = await sb.auth.getUser()
        if (!user) {
          if (mounted) {
            setRole(null) // anonymous
            setLoading(false)
          }
          return
        }
        const { data: profile, error } = await sb
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle()

        if (mounted) {
          if (error) {
            console.warn("profiles.role fetch error:", error.message)
          }
          setRole((profile?.role as any) ?? null)
          setLoading(false)
        }
      } catch (e) {
        console.warn("role load failed", e)
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [sb])

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (q && !(j.title + j.studio + j.description).toLowerCase().includes(q.toLowerCase())) return false
      if (loc && !j.location.toLowerCase().includes(loc.toLowerCase())) return false
      if (kinds.size && !kinds.has(j.kind)) return false
      if (pay !== "any") {
        const min = rateMinNumber(j.rate)
        if (pay === "90+" && min < 90) return false
        if (pay === "100+" && min < 100) return false
      }
      return true
    })
  }, [q, loc, kinds, pay])

  const toggleKind = (k: JobKind) => {
    setKinds(prev => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })
  }

  const clearAllFilters = () => {
    setPay("any")
    setKinds(new Set())
  }

  const onSave = (jobId: number) => {
    setSaved(prev => {
      const next = new Set(prev)
      next.has(jobId) ? next.delete(jobId) : next.add(jobId)
      return next
    })
  }

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

            {/* Role-aware nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jobs" className="text-orange-500 font-medium">Browse Jobs</Link>

              {role === "STUDIO" ? (
                <>
                  <Link href="/browse-instructors" className="text-gray-600 hover:text-orange-500">
                    Find Instructors
                  </Link>
                  <Link href="/post-job" className="text-gray-600 hover:text-orange-500">
                    Post Job
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/post-availability" className="text-gray-600 hover:text-orange-500">
                    Post Availability
                  </Link>
                </>
              )}

              <Link href={`/dashboard?type=${role === "STUDIO" ? "studio" : "instructor"}`} className="text-gray-600 hover:text-orange-500">
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild><Link href="/login">Sign In</Link></Button>
              {role === "STUDIO" && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/post-job">Post a Job</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-8">
        {/* Title / Subtitle vary by role */}
        <h1 className="text-2xl font-bold text-gray-900">
          {role === "INSTRUCTOR" ? "Lagree Jobs" : "Manage & Browse Jobs"}
        </h1>
        <p className="text-gray-600 mb-6">
          {role === "INSTRUCTOR"
            ? "Apply to open Lagree roles and covers near you."
            : "View your postings and explore the market."}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-80">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Filters</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(v => !v)}
                    className="lg:hidden"
                    aria-expanded={showFilters}
                    aria-controls="filters-content"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div id="filters-content" className={`${showFilters ? "block" : "hidden lg:block"} space-y-6`}>
                  {/* Pay */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Pay Range</Label>
                    <Select value={pay} onValueChange={v => setPay(v as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAY_PRESETS.map(p => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Job type chips */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Job Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TYPES.map(t => {
                        const active = kinds.has(t)
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleKind(t)}
                            className={`rounded-full border px-3 py-1.5 text-sm transition ${
                              active ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"
                            }`}
                            aria-pressed={active}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Active filter pills */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase text-gray-500">Active</div>
                    <div className="flex flex-wrap gap-2">
                      {pay !== "any" && (
                        <Badge
                          variant="secondary"
                          className="bg-white text-gray-700 cursor-pointer"
                          onClick={() => setPay("any")}
                        >
                          Pay: {PAY_PRESETS.find(p => p.value === pay)?.label} ✕
                        </Badge>
                      )}
                      {[...kinds].map(k => (
                        <Badge
                          key={k}
                          variant="secondary"
                          className="bg-white text-gray-700 cursor-pointer"
                          onClick={() =>
                            setKinds(prev => {
                              const next = new Set(prev)
                              next.delete(k)
                              return next
                            })
                          }
                        >
                          {k} ✕
                        </Badge>
                      ))}
                      {pay === "any" && kinds.size === 0 && (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </div>
                    {(pay !== "any" || kinds.size > 0) && (
                      <Button variant="ghost" size="sm" className="bg-transparent" onClick={clearAllFilters}>
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <section className="flex-1">
            {/* Search row */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search jobs, studios, or keywords…"
                      className="pl-10"
                      value={q}
                      onChange={e => setQ(e.target.value)}
                      aria-label="Search"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Location"
                      className="pl-10 md:w-48"
                      value={loc}
                      onChange={e => setLoc(e.target.value)}
                      aria-label="Location"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton / Empty / List */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No jobs found.</h3>
                  <p className="text-gray-600 mb-4">Try clearing filters or widening your location.</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filtered.map(job => {
                  const isSaved = saved.has(job.id)
                  return (
                    <Card key={job.id} className={job.featured ? "ring-2 ring-orange-200" : ""}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-xl font-semibold">{job.title}</div>
                              {job.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-2">
                              <div className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                <span className="font-medium text-orange-600">{job.studio}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </div>
                              <Badge variant="secondary">{job.kind}</Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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

                          <Button
                            variant="ghost"
                            size="sm"
                            aria-pressed={isSaved}
                            aria-label={isSaved ? "Unsave job" : "Save job"}
                            className={isSaved ? "text-red-500" : "text-gray-400"}
                            onClick={() => onSave(job.id)}
                            title={isSaved ? "Unsave" : "Save"}
                          >
                            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                          </Button>
                        </div>

                        <p className="text-gray-700 mt-4 mb-6">{job.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onSave(job.id)}>
                              {isSaved ? "Saved ✓" : "Save Job"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                const url = `/jobs/${job.id}`
                                if (navigator.share) {
                                  await navigator.share({ title: job.title, url })
                                } else {
                                  await navigator.clipboard.writeText(`${location.origin}${url}`)
                                  alert("Link copied!")
                                }
                              }}
                            >
                              Share
                            </Button>
                          </div>

                          <Button
                            className="bg-orange-500 hover:bg-orange-600"
                            onClick={() => alert(`Apply to: ${job.title} (stub)`)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
