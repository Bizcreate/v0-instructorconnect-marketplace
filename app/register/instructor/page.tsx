"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/app/(shared)/useSupabaseUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CreateInstructorPage() {
  const sb = createClient()
  const { user, loading } = useSupabaseUser()
  const [bio, setBio] = useState("")
  const [stateVal, setStateVal] = useState("")
  const [level, setLevel] = useState<"L1"|"L2">("L1")
  const [equipment, setEquipment] = useState<string>("M3K,M4")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (loading) return <div className="p-6">Loading…</div>
  if (!user) return (
    <div className="p-6">
      Please <Link className="text-orange-600 underline" href="/login">sign in</Link> first.
    </div>
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMessage(null)

    // Ensure a profile row exists & set role = INSTRUCTOR
    await sb.from("profiles")
      .upsert({ id: user.id, role: "INSTRUCTOR" }, { onConflict: "id" })

    const { error } = await sb.from("instructors").upsert({
      user_id: user.id,            // unique (one instructor row per user)
      bio,
      state: stateVal,
      lagree_level: level,
      equipment: equipment.split(",").map(s=>s.trim()), // text[]
    }, { onConflict: "user_id" })

    setBusy(false)
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage("Instructor saved! Redirecting to dashboard…")
      setTimeout(() => {
        window.location.href = "/dashboard?type=instructor"
      }, 900)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Create Instructor Profile</h1>
      <p className="text-gray-600 mb-6">Save a test instructor to Supabase.</p>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Lagree Level</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={level}
                onChange={e=>setLevel(e.target.value as any)}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Equipment (comma separated)</label>
              <Input value={equipment} onChange={e=>setEquipment(e.target.value)} />
              <p className="text-xs text-gray-500 mt-1">e.g. M3K,M4,Micro</p>
            </div>

            <div>
              <label className="block text-sm mb-1">State</label>
              <Input value={stateVal} onChange={e=>setStateVal(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Bio</label>
              <Textarea value={bio} onChange={e=>setBio(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={busy} className="bg-orange-500 hover:bg-orange-600">
                {busy ? "Saving…" : "Save Instructor"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard?type=instructor">Cancel</Link>
              </Button>
            </div>

            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
