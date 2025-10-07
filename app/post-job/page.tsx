// app/post-job/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Plus, Minus } from "lucide-react"

type PayType = "per-class" | "per-session" | "hourly" | "salary" | undefined

const LAGREE_LEVELS = ["L1 (Foundations)", "L2 (Intermediate)", "L3 (Advanced)", "Master / Lead"]
const LAGREE_MACHINES = ["Megaformer M3", "Megaformer M3K", "EVO", "Microformer"]
const CLASS_TYPES = ["Foundations", "Full Body", "Strength", "Endurance", "Prenatal-friendly", "Beginner Intro", "Advanced Series", "Class Cover / On-call"]

export default function PostJobPage() {
  const router = useRouter()

  // chip multi-selects
  const [levels, setLevels] = useState<string[]>([])
  const [machines, setMachines] = useState<string[]>([])
  const [classTypes, setClassTypes] = useState<string[]>([])

  // dynamic lists
  const [requirements, setRequirements] = useState<string[]>(["Lagree L1 Certified"])
  const [benefits, setBenefits] = useState<string[]>(["Free class credits"])

  // simple fields
  const [title, setTitle] = useState("")
  const [jobType, setJobType] = useState<"full-time" | "part-time" | "casual" | "contract" | undefined>()
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [schedule, setSchedule] = useState("")
  const [hours, setHours] = useState("")
  const [payType, setPayType] = useState<PayType>()
  const [payMin, setPayMin] = useState<number | undefined>()
  const [payMax, setPayMax] = useState<number | undefined>()
  const [deadline, setDeadline] = useState<string>()
  const [startDate, setStartDate] = useState<string>()
  const [urgent, setUrgent] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [emailUpdates, setEmailUpdates] = useState(true)

  const toggle = (value: string, list: string[], setList: (n: string[]) => void) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      title, jobType, location, description, schedule, hours,
      payType, payMin, payMax,
      levels, machines, classTypes,
      requirements, benefits,
      urgent, featured, deadline, startDate, emailUpdates,
      domain: "LAGREE_ONLY"
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      // later: read job id from response
      router.push("/jobs")
    } else {
      alert("Something went wrong posting the job.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
            </Link>
            <Link href="/dashboard?type=studio" className="text-gray-600 hover:text-orange-500">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Lagree Role</h1>
            <p className="text-gray-600">List your Lagree class openings and find certified coaches</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Job Details */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>

                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input id="jobTitle" placeholder="e.g., Lagree Coach (L1 Foundations)" value={title} onChange={e=>setTitle(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobType">Job Type *</Label>
                      <Select value={jobType} onValueChange={(v:any)=>setJobType(v)}>
                        <SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input id="location" placeholder="e.g., Melbourne CBD, VIC" value={location} onChange={e=>setLocation(e.target.value)} required />
                    </div>
                  </div>

                  {/* Lagree specialisation */}
                  <div>
                    <Label>Lagree Level(s) *</Label>
                    <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {LAGREE_LEVELS.map(l => (
                        <label key={l} className="flex items-center space-x-2">
                          <Checkbox checked={levels.includes(l)} onCheckedChange={()=>toggle(l, levels, setLevels)} />
                          <span className="text-sm">{l}</span>
                        </label>
                      ))}
                    </div>
                    {!!levels.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {levels.map(s => <Badge key={s} variant="secondary" className="bg-orange-100 text-orange-700">{s}</Badge>)}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Machine(s) *</Label>
                    <p className="text-sm text-gray-600 mb-3">Select the equipment you use</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {LAGREE_MACHINES.map(m => (
                        <label key={m} className="flex items-center space-x-2">
                          <Checkbox checked={machines.includes(m)} onCheckedChange={()=>toggle(m, machines, setMachines)} />
                          <span className="text-sm">{m}</span>
                        </label>
                      ))}
                    </div>
                    {!!machines.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {machines.map(s => <Badge key={s} variant="secondary" className="bg-orange-100 text-orange-700">{s}</Badge>)}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Class Type(s)</Label>
                    <p className="text-sm text-gray-600 mb-3">Pick all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {CLASS_TYPES.map(c => (
                        <label key={c} className="flex items-center space-x-2">
                          <Checkbox checked={classTypes.includes(c)} onCheckedChange={()=>toggle(c, classTypes, setClassTypes)} />
                          <span className="text-sm">{c}</span>
                        </label>
                      ))}
                    </div>
                    {!!classTypes.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {classTypes.map(s => <Badge key={s} variant="secondary" className="bg-orange-100 text-orange-700">{s}</Badge>)}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Outline class flow expectations, cueing style, safety, music, client experience, mentoring, etc."
                      rows={6}
                      value={description}
                      onChange={e=>setDescription(e.target.value)}
                      required
                    />
                  </div>
                </section>

                {/* Schedule & Compensation */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Schedule & Compensation</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input id="schedule" placeholder="e.g., Mon-Fri 6:00 AM & 7:00 PM" value={schedule} onChange={e=>setSchedule(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                      <Input id="hoursPerWeek" placeholder="e.g., 6–12 classes" value={hours} onChange={e=>setHours(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="payType">Pay Type</Label>
                      <Select value={payType} onValueChange={(v:any)=>setPayType(v)}>
                        <SelectTrigger><SelectValue placeholder="Select pay type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per-class">Per Class</SelectItem>
                          <SelectItem value="per-session">Per Session</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="payMin">Minimum Rate ($)</Label>
                      <Input id="payMin" type="number" placeholder="80" value={payMin ?? ""} onChange={e=>setPayMin(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                    <div>
                      <Label htmlFor="payMax">Maximum Rate ($)</Label>
                      <Input id="payMax" type="number" placeholder="110" value={payMax ?? ""} onChange={e=>setPayMax(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                  </div>
                </section>

                {/* Requirements */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry (0–1 yrs coaching)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2–3 yrs)</SelectItem>
                        <SelectItem value="experienced">Experienced (4–5 yrs)</SelectItem>
                        <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Specific Requirements</Label>
                    <p className="text-sm text-gray-600 mb-3">e.g., Lagree L2, CPR/First Aid, Music mixing, Prenatal safe cues</p>
                    {requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={req}
                          onChange={(e) => {
                            const next = [...requirements]
                            next[index] = e.target.value
                            setRequirements(next)
                          }}
                          placeholder="e.g., Lagree L2 Certified"
                        />
                        {requirements.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => setRequirements(requirements.filter((_, i) => i !== index))}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => setRequirements([...requirements, ""])} className="mt-2 bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </section>

                {/* Benefits */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Benefits & Perks</h3>
                  {benefits.map((b, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={b}
                        onChange={(e) => {
                          const next = [...benefits]
                          next[index] = e.target.value
                          setBenefits(next)
                        }}
                        placeholder="e.g., Free membership, training stipend"
                      />
                      {benefits.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => setBenefits(benefits.filter((_, i) => i !== index))}>
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => setBenefits([...benefits, ""])} className="mt-2 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Benefit
                  </Button>
                </section>

                {/* Application Settings */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Application Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input id="deadline" type="date" value={deadline ?? ""} onChange={e=>setDeadline(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input id="startDate" type="date" value={startDate ?? ""} onChange={e=>setStartDate(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox checked={urgent} onCheckedChange={(v)=>setUrgent(Boolean(v))} />
                      <span>This is an urgent position</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox checked={featured} onCheckedChange={(v)=>setFeatured(Boolean(v))} />
                      <span>Make this a featured job (+$50)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox checked={emailUpdates} onCheckedChange={(v)=>setEmailUpdates(Boolean(v))} />
                      <span>Send me email updates about applications</span>
                    </label>
                  </div>
                </section>

                {/* Submit */}
                <div className="flex gap-4 pt-6">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent">Save as Draft</Button>
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">Post Job</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
