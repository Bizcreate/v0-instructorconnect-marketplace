"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/app/(shared)/useSupabaseUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CreateStudioPage() {
  const sb = createClient()
  const { user, loading } = useSupabaseUser()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [stateVal, setStateVal] = useState("")
  const [description, setDescription] = useState("")
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

    // Ensure a profile row exists & set role = STUDIO
    await sb.from("profiles")
      .upsert({ id: user.id, role: "STUDIO" }, { onConflict: "id" })

    const { error } = await sb.from("studios").insert({
      owner_id: user.id,      // RLS policy requires owner_id = auth.uid()
      name,
      address,
      state: stateVal,
      description,
    })

    setBusy(false)
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage("Studio saved! Redirecting to dashboard…")
      setTimeout(() => {
        window.location.href = "/dashboard?type=studio"
      }, 900)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Create Studio</h1>
      <p className="text-gray-600 mb-6">Save a test studio to Supabase.</p>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Studio Name</label>
              <Input value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Address</label>
              <Input value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">State</label>
              <Input value={stateVal} onChange={e=>setStateVal(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <Textarea value={description} onChange={e=>setDescription(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={busy} className="bg-orange-500 hover:bg-orange-600">
                {busy ? "Saving…" : "Save Studio"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard?type=studio">Cancel</Link>
              </Button>
            </div>

            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
