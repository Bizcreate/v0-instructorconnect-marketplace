// app/register/page.tsx
"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const params = useSearchParams()
  const router = useRouter()
  const type = params.get("type") === "studio" ? "studio" : "instructor"

  return type === "studio" ? <StudioForm onDone={() => router.push("/dashboard?type=studio")} /> : <InstructorForm onDone={() => router.push("/dashboard?type=instructor")} />
}

/* ---------------- Studio ---------------- */

function StudioForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [size, setSize] = useState<"SMALL"|"MEDIUM"|"LARGE"|"CHAIN">("SMALL")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async () => {
    try {
      setErr(null); setSubmitting(true)
      const res = await fetch("/api/onboarding/studio", {
        method: "POST",
        credentials: "include",        // <— IMPORTANT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, state, size, description }),
      })
      const json = await res.json().catch(()=> ({} as any))
      if (!res.ok) {
        console.error("Onboard studio failed:", json)
        setError(json.error ?? "Failed to save studio")   // show in UI
        return
      }
      router.push("/dashboard?type=studio")
      
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Lagree Studio Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Studio Name *</Label>
            <Input value={name} onChange={e=>setName(e.target.value)} placeholder="CoreLagree Melbourne" />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Melbourne CBD, VIC" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>State</Label>
              <Input value={state} onChange={e=>setState(e.target.value)} placeholder="VIC" />
            </div>
            <div>
              <Label>Studio Size</Label>
              <Select value={size} onValueChange={v=>setSize(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMALL">Small</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LARGE">Large</SelectItem>
                  <SelectItem value="CHAIN">Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Equipment (M3K/M4/Micro), formats, brand…" />
          </div>

          {err ? <p className="text-sm text-red-600">{err}</p> : null}

          <div className="flex gap-3">
            <Button onClick={submit} disabled={submitting} className="bg-orange-500 hover:bg-orange-600">
              {submitting ? "Saving…" : "Save & Continue"}
            </Button>
            <Button variant="outline" asChild><Link href="/">Cancel</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------------- Instructor ---------------- */

const EQUIP = ["M3K","M4","Micro"] as const
const LEVELS = ["L1","L2"] as const

function InstructorForm({ onDone }: { onDone: () => void }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [state, setState] = useState("")
  const [bio, setBio] = useState("")
  const [experienceYears, setExperienceYears] = useState("")
  const [lagreeLevel, setLagreeLevel] = useState<"L1"|"L2">("L1")
  const [equipment, setEquipment] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>(["Lagree"])
  const [availabilityText, setAvailabilityText] = useState("")
  const [cvUrl, setCvUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const toggleEq = (e: string) => {
    setEquipment(prev => prev.includes(e) ? prev.filter(x=>x!==e) : [...prev, e])
  }

  const submit = async () => {
    try {
      setErr(null); setSubmitting(true)
      const res = await fetch("/api/onboarding/instructor", {
        method: "POST",
        credentials: "include",        // <— IMPORTANT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName, lastName, state, bio, experienceYears,
          lagreeLevel, equipment, skills, cvUrl, availabilityText
        }),
      })
      const json = await res.json().catch(()=> ({} as any))
      if (!res.ok) {
        console.error("Onboard instructor failed:", json)
        setError(json.error ?? "Failed to save instructor")
        return
      }
      router.push("/dashboard?type=instructor")
      
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Lagree Instructor Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name *</Label>
              <Input value={firstName} onChange={e=>setFirstName(e.target.value)} />
            </div>
            <div>
              <Label>Last Name *</Label>
              <Input value={lastName} onChange={e=>setLastName(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>State</Label>
              <Input value={state} onChange={e=>setState(e.target.value)} placeholder="VIC" />
            </div>
            <div>
              <Label>Lagree Level</Label>
              <Select value={lagreeLevel} onValueChange={v=>setLagreeLevel(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Equipment Experience</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {EQUIP.map(e => {
                const active = equipment.includes(e)
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={()=>toggleEq(e)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${active ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                    aria-pressed={active}
                  >
                    {e}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <Label>Bio</Label>
            <Textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Certifications, formats, coaching style…" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Experience (years)</Label>
              <Input value={experienceYears} onChange={e=>setExperienceYears(e.target.value)} placeholder="2+" />
            </div>
            <div>
              <Label>CV URL (optional for now)</Label>
              <Input value={cvUrl} onChange={e=>setCvUrl(e.target.value)} placeholder="https://…" />
            </div>
          </div>

          <div>
            <Label>Availability (free text)</Label>
            <Textarea value={availabilityText} onChange={e=>setAvailabilityText(e.target.value)} placeholder="Mon–Thu 6–10AM, weekends…" />
          </div>

          {err ? <p className="text-sm text-red-600">{err}</p> : null}

          <div className="flex gap-3">
            <Button onClick={submit} disabled={submitting} className="bg-orange-500 hover:bg-orange-600">
              {submitting ? "Saving…" : "Save & Continue"}
            </Button>
            <Button variant="outline" asChild><Link href="/">Cancel</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
