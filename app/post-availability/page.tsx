"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

// Minimal UI bits – swap to your shadcn components if you like
function Label(props: any) { return <label className="block text-sm font-medium text-gray-700 mb-1" {...props} /> }
function Input(props: any) { return <input className="w-full border rounded-md px-3 py-2 text-sm" {...props} /> }
function Textarea(props: any) { return <textarea className="w-full border rounded-md px-3 py-2 text-sm" {...props} /> }
function Select(props: any) { return <select className="w-full border rounded-md px-3 py-2 text-sm" {...props} /> }
function Button({ className = "", ...props }: any) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium"
  return <button className={`${base} ${className}`} {...props} />
}
function Card({ className = "", ...props }: any) {
  return <div className={`border rounded-xl bg-white ${className}`} {...props} />
}
function CardHeader({ className = "", ...props }: any) {
  return <div className={`p-5 border-b ${className}`} {...props} />
}
function CardContent({ className = "", ...props }: any) {
  return <div className={`p-5 ${className}`} {...props} />
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs bg-white">{children}</span>
}

// ---------- helpers ----------
type DOW = 0|1|2|3|4|5|6 // Sun..Sat

function parseDate(d: string) {
  // yyyy-mm-dd -> Date at local 00:00
  const [y,m,dd] = d.split("-").map(Number)
  return new Date(y, (m ?? 1)-1, dd ?? 1)
}
function formatDateTime(dt: Date) {
  return dt.toLocaleString([], { year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit" })
}
function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate()+n); return x }
function* eachDay(start: Date, end: Date) {
  for (let d=new Date(start); d<=end; d=addDays(d,1)) yield d
}
function combineDateAndTime(d: Date, t: string) {
  // t = "HH:MM"
  const [hh, mm] = t.split(":").map(Number)
  const out = new Date(d)
  out.setHours(hh || 0, mm || 0, 0, 0)
  return out
}

const EQUIPMENT = ["M3K","M4","Micro"] as const
const LEVELS = ["L1","L2"] as const
const UNITS = ["class","session","hour"] as const
const KINDS = ["Cover","Recurring Class","Private"] as const

type Slot = { start: Date; end: Date }

export default function PostAvailabilityPage() {
  const sb = useMemo(() => createClient(), [])
  const [userId, setUserId] = useState<string | null>(null)
  const [instructorId, setInstructorId] = useState<string | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // form state
  const [rangeStart, setRangeStart] = useState<string>("")          // yyyy-mm-dd
  const [rangeEnd, setRangeEnd] = useState<string>("")              // yyyy-mm-dd
  const [repeatDays, setRepeatDays] = useState<Set<DOW>>(new Set([1,3])) // Mon, Wed default
  const [startTime, setStartTime] = useState("06:00")               // HH:mm
  const [endTime, setEndTime] = useState("10:00")
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Cover")
  const [rateMin, setRateMin] = useState<number | "">("")
  const [rateUnit, setRateUnit] = useState<(typeof UNITS)[number]>("class")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("L1")
  const [equip, setEquip] = useState<Set<string>>(new Set(["M3K"]))

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // load auth + instructor id
  useEffect(() => {
    (async () => {
      setLoadingProfile(true)
      const { data: { user } } = await sb.auth.getUser()
      if (!user) {
        setUserId(null)
        setInstructorId(null)
        setLoadingProfile(false)
        return
      }
      setUserId(user.id)
      // find instructor row by user_id
      const { data: inst, error } = await sb
        .from("instructors")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
      if (error) {
        setError(error.message)
      } else {
        setInstructorId(inst?.id ?? null)
      }
      setLoadingProfile(false)
    })()
  }, [sb])

  // generate slots preview
  const slots: Slot[] = useMemo(() => {
    setMessage(null); setError(null)
    if (!rangeStart || !rangeEnd) return []
    const start = parseDate(rangeStart)
    const end = parseDate(rangeEnd)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return []
    if (!startTime || !endTime) return []

    const out: Slot[] = []
    for (const day of eachDay(start, end)) {
      const dow = day.getDay() as DOW
      if (!repeatDays.has(dow)) continue
      const st = combineDateAndTime(day, startTime)
      const et = combineDateAndTime(day, endTime)
      if (et <= st) continue
      out.push({ start: st, end: et })
    }
    return out
  }, [rangeStart, rangeEnd, startTime, endTime, repeatDays])

  const totalHours = useMemo(() => {
    let mins = 0
    for (const s of slots) mins += (s.end.getTime() - s.start.getTime()) / 60000
    return (mins/60).toFixed(1)
  }, [slots])

  const toggleDay = (d: DOW) => {
    setRepeatDays(prev => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d); else next.add(d)
      return next
    })
  }

  const toggleEquip = (e: string) => {
    setEquip(prev => {
      const next = new Set(prev)
      if (next.has(e)) next.delete(e); else next.add(e)
      return next
    })
  }

  async function submit() {
    setError(null); setMessage(null)

    if (!userId) { setError("Please sign in to post availability."); return }
    if (!instructorId) { setError("Please complete your instructor profile before posting availability."); return }
    if (!rangeStart || !rangeEnd || slots.length === 0) { setError("Select a valid date range, times, and repeat days."); return }

    setSubmitting(true)
    try {
      const rows = slots.map(s => ({
        instructor_id: instructorId,
        start_ts: s.start.toISOString(),
        end_ts: s.end.toISOString(),
        kind,
        location: location || null,
        notes: [
          `Level: ${level}`,
          `Equipment: ${[...equip].join(", ") || "—"}`,
          notes ? `Notes: ${notes}` : ""
        ].filter(Boolean).join(" • "),
        rate_min: rateMin === "" ? null : Number(rateMin),
        rate_unit: rateUnit,
      }))

      const { error } = await sb.from("availability").insert(rows)
      if (error) throw error

      setMessage(`Posted ${rows.length} slot${rows.length>1?"s":""} successfully.`)
      // optional: clear form
      // setRangeStart(""); setRangeEnd(""); setRepeatDays(new Set([1,3])); setLocation(""); setNotes(""); setRateMin(""); ...
    } catch (e: any) {
      setError(e?.message ?? "Failed to post availability.")
    } finally {
      setSubmitting(false)
    }
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Post Availability</h1>
            <p className="text-gray-600">Create one-off or weekly recurring Lagree availability slots.</p>
          </div>
          <Link href="/dashboard?type=instructor" className="text-orange-600 underline">Back to Dashboard</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="font-semibold text-gray-900">Details</div>
              {loadingProfile ? <div className="text-sm text-gray-500 mt-1">Checking profile…</div> : (
                !instructorId ? <div className="text-sm text-red-600 mt-1">No instructor profile found. <Link href="/register?type=instructor" className="underline">Create your profile</Link> first.</div> : null
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from">Date range – From</Label>
                  <Input id="from" type="date" value={rangeStart} onChange={e=>setRangeStart(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="to">Date range – To</Label>
                  <Input id="to" type="date" value={rangeEnd} onChange={e=>setRangeEnd(e.target.value)} />
                </div>
              </div>

              {/* Weekly repeat */}
              <div>
                <Label>Repeat on</Label>
                <div className="flex flex-wrap gap-2">
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((label, idx) => {
                    const active = repeatDays.has(idx as DOW)
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={()=>toggleDay(idx as DOW)}
                        aria-pressed={active}
                        className={`px-3 py-1.5 rounded-full border text-sm ${active ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-1">We’ll generate one slot on each selected weekday within your date range.</p>
              </div>

              {/* Time window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start time</Label>
                  <Input id="startTime" type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="endTime">End time</Label>
                  <Input id="endTime" type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} />
                </div>
              </div>

              {/* Type, rate, unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="kind">Availability type</Label>
                  <Select id="kind" value={kind} onChange={e=>setKind(e.target.value as any)}>
                    {KINDS.map(k => <option key={k} value={k}>{k}</option>)}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rate">Rate (min)</Label>
                  <Input id="rate" type="number" placeholder="e.g. 80" value={rateMin} onChange={e=>setRateMin(e.target.value ? Number(e.target.value) : "")} />
                </div>
                <div>
                  <Label htmlFor="unit">Rate unit</Label>
                  <Select id="unit" value={rateUnit} onChange={e=>setRateUnit(e.target.value as any)}>
                    {UNITS.map(u => <option key={u} value={u}>per {u}</option>)}
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="loc">Location</Label>
                <Input id="loc" placeholder="e.g., Melbourne CBD, VIC" value={location} onChange={e=>setLocation(e.target.value)} />
              </div>

              {/* Level & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Lagree Level</Label>
                  <Select id="level" value={level} onChange={e=>setLevel(e.target.value as any)}>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Equipment</Label>
                  <div className="flex flex-wrap gap-2">
                    {EQUIPMENT.map(e => {
                      const active = equip.has(e)
                      return (
                        <button
                          key={e}
                          type="button"
                          onClick={()=>toggleEquip(e)}
                          aria-pressed={active}
                          className={`px-3 py-1.5 rounded-full border text-sm ${active ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white border-gray-200"}`}
                        >
                          {e}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={4} placeholder="Equipment specifics, travel radius, preferences…" value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                  disabled={submitting || !instructorId}
                  onClick={submit}
                >
                  {submitting ? "Posting…" : "Post Availability"}
                </Button>
                <Link href="/dashboard?type=instructor" className="text-gray-600 hover:underline">Cancel</Link>
              </div>

              {message && <div className="text-green-600 text-sm">{message}</div>}
              {error && <div className="text-red-600 text-sm">{error}</div>}
            </CardContent>
          </Card>

          {/* Right: preview */}
          <Card>
            <CardHeader>
              <div className="font-semibold text-gray-900">Preview</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>{kind}</Badge>
                {rateMin !== "" && <Badge>${rateMin} / {rateUnit}</Badge>}
                {level && <Badge>Level {level}</Badge>}
                {[...equip].map(e => <Badge key={e}>{e}</Badge>)}
              </div>

              <div className="text-sm text-gray-600">
                {rangeStart && rangeEnd ? (
                  <>Range: <strong>{rangeStart}</strong> → <strong>{rangeEnd}</strong></>
                ) : "Select a date range"}
              </div>

              <div className="text-sm text-gray-600">
                Days: {[...repeatDays].sort().map(d => ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d]).join(", ") || "None"}
              </div>

              <div className="text-sm text-gray-600">
                Time: {startTime} – {endTime}
              </div>

              <div className="border-t pt-3">
                <div className="text-sm text-gray-900 font-medium mb-1">
                  {slots.length} slot{slots.length!==1?"s":""} • {totalHours} hrs total
                </div>
                {slots.length ? (
                  <ul className="space-y-1 max-h-64 overflow-auto pr-1 text-sm">
                    {slots.slice(0, 20).map((s, i) => (
                      <li key={i} className="text-gray-700">
                        {formatDateTime(s.start)} → {formatDateTime(s.end)}
                      </li>
                    ))}
                    {slots.length > 20 && (
                      <li className="text-gray-400 italic">…and {slots.length - 20} more</li>
                    )}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-400">Your generated slots will appear here.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
