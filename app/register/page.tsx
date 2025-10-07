"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Building2, User, ArrowLeft, UploadCloud } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"studio" | "instructor" | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [certs, setCerts] = useState<string[]>([])
  const [equip, setEquip] = useState<string[]>([])
  const [days, setDays] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [cvUrl, setCvUrl] = useState<string | null>(null)

  // Lagree options
  const lagreeCerts = ["Lagree L1", "Lagree L2"]
  const equipment = ["Megaformer (M3K)", "Megaformer (M4)", "Microformer"]
  const availabilityDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // legacy generic skills (still shown as tags when chosen)
  const fitnessSkills = [
    "Lagree", // keep “Lagree” at the top
    // optional: you can delete the rest later if you want to be 100% Lagree-only
    "Strength Training",
    "HIIT",
    "Rehabilitation",
  ]

  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  // demo upload handler (expects /api/uploads later)
  async function handleCvUpload(file: File) {
    try {
      setUploading(true)
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/uploads", { method: "POST", body: fd })
      const json = await res.json().catch(() => null)
      if (json?.url) setCvUrl(json.url)
      else alert("Upload failed. (API not wired yet.)")
    } catch {
      alert("Upload error.")
    } finally {
      setUploading(false)
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">InstructorConnect</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join InstructorConnect</h1>
            <p className="text-xl text-gray-600">Choose how you'd like to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => setUserType("studio")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">I’m a Lagree Studio</CardTitle>
                <CardDescription className="text-base">Hire certified Lagree instructors & post class covers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Post Lagree roles & covers</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Filter by L1/L2 & equipment</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Message & book faster</li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Register as Studio</Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => setUserType("instructor")}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">I’m a Lagree Instructor</CardTitle>
                <CardDescription className="text-base">Create your L1/L2 profile & publish availability</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Show L1/L2 & equipment (M3K/M4/Micro)</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Set availability & preferred rates</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>Apply to Lagree roles</li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Register as Instructor</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button onClick={() => setUserType(null)} className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Selection
          </button>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Dumbbell className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === "studio" ? "Studio Registration" : "Lagree Instructor Registration"}
          </h1>
          <p className="text-gray-600">
            {userType === "studio"
              ? "Create your studio profile and start posting Lagree jobs & covers"
              : "Build your Lagree profile (L1/L2), equipment experience, and availability"}
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            {userType === "studio" ? (
              <StudioForm />
            ) : (
              <InstructorForm
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                fitnessSkills={fitnessSkills}
                lagreeCerts={lagreeCerts}
                certs={certs}
                setCerts={setCerts}
                equipment={equipment}
                equip={equip}
                setEquip={setEquip}
                availabilityDays={availabilityDays}
                days={days}
                setDays={setDays}
                uploading={uploading}
                cvUrl={cvUrl}
                onUploadCv={handleCvUpload}
              />
            )}
          </CardContent>
        </Card>

        {/* Dual CTA panels you liked */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-orange-100">
            <CardHeader><CardTitle className="text-2xl">Hire Certified Lagree Instructors</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Post roles and covers with equipment & level requirements. Message candidates directly and book faster.
              </p>
              <div className="flex gap-3">
                <Button className="bg-orange-500 hover:bg-orange-600" asChild><Link href="/post-job">Post a Lagree Job</Link></Button>
                <Button variant="outline" asChild><Link href="/browse-instructors">Find Instructors</Link></Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardHeader><CardTitle className="text-2xl">Grow Your Lagree Career</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Showcase your L1/L2, equipment experience (M3K/M4/Micro), and set availability for covers & recurring classes.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" asChild><Link href="/register?type=instructor">Create Lagree Profile</Link></Button>
                <Button asChild><Link href="/dashboard?type=instructor">Go to Dashboard</Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ------------------ Extracted Forms ------------------ */

function StudioForm() {
  return (
    <form className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="Enter your first name" /></div>
          <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Enter your last name" /></div>
        </div>

        <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="your.email@example.com" /></div>
        <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" placeholder="+61 4XX XXX XXX" /></div>

        <div>
          <Label htmlFor="location">State</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
            <SelectContent>
              {["New South Wales","Victoria","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map((s)=>(
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Studio Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Studio Information</h3>
        <div><Label htmlFor="studioName">Studio Name</Label><Input id="studioName" placeholder="Your Studio Name" /></div>
        <div><Label htmlFor="studioAddress">Studio Address</Label><Input id="studioAddress" placeholder="123 Fitness Street, Melbourne VIC 3000" /></div>
        <div><Label htmlFor="studioDescription">Studio Description</Label><Textarea id="studioDescription" placeholder="Equipment (M3K/M4/Micro), class formats, values…" rows={4} /></div>

        <div>
          <Label htmlFor="studioSize">Studio Size</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select studio size" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (1-2 instructors)</SelectItem>
              <SelectItem value="medium">Medium (3-10 instructors)</SelectItem>
              <SelectItem value="large">Large (11-25 instructors)</SelectItem>
              <SelectItem value="chain">Chain/Franchise (25+ instructors)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Terms */}
      <TermsAndSubmit submitLabel="Create Studio Account" />
    </form>
  )
}

type InstructorFormProps = {
  selectedSkills: string[]
  setSelectedSkills: (v: string[]) => void
  fitnessSkills: string[]
  lagreeCerts: string[]
  certs: string[]
  setCerts: (v: string[]) => void
  equipment: string[]
  equip: string[]
  setEquip: (v: string[]) => void
  availabilityDays: string[]
  days: string[]
  setDays: (v: string[]) => void
  uploading: boolean
  cvUrl: string | null
  onUploadCv: (file: File) => Promise<void>
}

function InstructorForm(props: InstructorFormProps) {
  const {
    selectedSkills, setSelectedSkills, fitnessSkills,
    lagreeCerts, certs, setCerts,
    equipment, equip, setEquip,
    availabilityDays, days, setDays,
    uploading, cvUrl, onUploadCv
  } = props

  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  return (
    <form className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="Enter your first name" /></div>
          <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Enter your last name" /></div>
        </div>

        <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="your.email@example.com" /></div>
        <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" placeholder="+61 4XX XXX XXX" /></div>

        <div>
          <Label>State</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
            <SelectContent>
              {["New South Wales","Victoria","Queensland","Western Australia","South Australia","Tasmania","ACT","Northern Territory"].map((s)=>(
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lagree Profile */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Lagree Profile</h3>

        <div>
          <Label>Lagree Certifications</Label>
          <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {lagreeCerts.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggle(certs, setCerts, c)}
                className={`rounded-full border px-3 py-1.5 text-sm ${certs.includes(c) ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                aria-pressed={certs.includes(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Equipment Experience</Label>
          <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {equipment.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggle(equip, setEquip, e)}
                className={`rounded-full border px-3 py-1.5 text-sm ${equip.includes(e) ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                aria-pressed={equip.includes(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>General Skills (optional)</Label>
          <p className="text-sm text-gray-600 mb-2">You can keep it Lagree-only or add adjacent skills</p>
          <div className="flex flex-wrap gap-2">
            {fitnessSkills.map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${s}`}
                  checked={selectedSkills.includes(s)}
                  onCheckedChange={() =>
                    setSelectedSkills(
                      selectedSkills.includes(s)
                        ? selectedSkills.filter((x) => x !== s)
                        : [...selectedSkills, s],
                    )
                  }
                />
                <Label htmlFor={`skill-${s}`} className="text-sm">{s}</Label>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-orange-100 text-orange-700">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea id="bio" placeholder="Tell us about your Lagree journey, teaching style, and standout results…" rows={4} />
        </div>

        {/* Media + CV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="video">Demo Video URL (optional)</Label>
            <Input id="video" type="url" placeholder="https://youtu.be/…" />
            <p className="text-xs text-gray-500 mt-1">Short class clip or cueing demo helps studios decide faster.</p>
          </div>
          <div>
            <Label htmlFor="instagram">Instagram (optional)</Label>
            <Input id="instagram" type="url" placeholder="https://instagram.com/yourhandle" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Upload CV (PDF)</Label>
          <div className="flex items-center gap-3">
            <Input
              id="cv"
              type="file"
              accept="application/pdf"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) await onUploadCv(file)
              }}
            />
            <Button type="button" variant="outline" disabled={uploading} className="bg-transparent">
              <UploadCloud className="h-4 w-4 mr-2" />
              {uploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
          {cvUrl && <p className="text-sm text-green-600">Uploaded ✓ <a className="underline" href={cvUrl}>Preview CV</a></p>}
          <p className="text-xs text-gray-500">PDF only. ~5MB max. (Wire /api/uploads to store.)</p>
        </div>
      </div>

      {/* Availability & Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Availability & Preferences</h3>

        <div>
          <Label>Days Available</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {availabilityDays.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggle(days, setDays, d)}
                className={`rounded-full border px-3 py-1.5 text-sm ${days.includes(d) ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                aria-pressed={days.includes(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="prefType">Looking for</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Covers / Casual / Part-time" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Class covers</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="minRate">Preferred Min Rate ($/class)</Label>
            <Input id="minRate" type="number" placeholder="80" />
          </div>
          <div>
            <Label htmlFor="suburbs">Primary Suburb(s)</Label>
            <Input id="suburbs" placeholder="e.g., South Yarra, Richmond" />
          </div>
        </div>

        <div>
          <Label htmlFor="availabilityNotes">Availability Notes</Label>
          <Textarea id="availabilityNotes" placeholder="e.g., Weekday mornings, Saturdays after 9AM, short-notice covers OK" rows={3} />
        </div>
      </div>

      {/* Terms */}
      <TermsAndSubmit submitLabel="Create Instructor Account" />
    </form>
  )
}

function TermsAndSubmit({ submitLabel }: { submitLabel: string }) {
  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link href="/terms" className="text-orange-500 hover:underline">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing" className="text-sm">
          I'd like to receive updates about new opportunities and platform features
        </Label>
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
        {submitLabel}
      </Button>

      <div className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500 hover:underline font-medium">Sign in here</Link>
      </div>
    </div>
  )
}
