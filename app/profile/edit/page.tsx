"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient as createSbClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const EQUIP = ["M3K", "M4", "MegaPro", "Micro", "MicroPro", "Mini", "MiniPro"] as const

export default function EditProfilePage() {
  const sb = useMemo(() => createSbClient(), [])
  const router = useRouter()

  const [role, setRole] = useState<"INSTRUCTOR" | "STUDIO" | null>(null)
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")

  // instructor fields
  const [bio, setBio] = useState("")
  const [level, setLevel] = useState<"L1" | "L2" | "L3" | "">("")
  const [equipment, setEquipment] = useState<string[]>([])
  const [skills, setSkills] = useState<string>("") // comma string for UX
  const [state, setState] = useState("")
  const [cvUrl, setCvUrl] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await sb.auth.getUser()
      if (!user) { router.push("/login"); return }

      const { data: profile } = await sb.from("profiles")
        .select("role,first_name,last_name")
        .eq("id", user.id).maybeSingle()
      if (profile) {
        setRole(profile.role as any)
        setFirst(profile.first_name ?? "")
        setLast(profile.last_name ?? "")
      }

      if (profile?.role === "INSTRUCTOR") {
        const { data: i } = await sb.from("instructors")
          .select("*")
          .eq("user_id", user.id).maybeSingle()
        if (i) {
          setBio(i.bio ?? "")
          setLevel((i.lagree_level as any) ?? "")
          setEquipment(i.equipment ?? [])
          setSkills((i.skills ?? []).join(", "))
          setState(i.state ?? "")
          setCvUrl(i.cv_url ?? null)
        }
      }
    })()
  }, [sb, router])

  const onUploadCV = async (file: File) => {
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (ext !== "pdf") {
      alert("PDF only for now")
      return
    }
    const path = `cv/${user.id}.pdf`
    const { error } = await sb.storage.from("uploads").upload(path, file, { upsert: true })
    if (error) { alert(error.message); return }
    const { data: pub } = sb.storage.from("uploads").getPublicUrl(path)
    setCvUrl(pub.publicUrl)
  }

  const toggleEquipment = (e: string) => {
    setEquipment(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e])
  }

  const save = async () => {
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return

    // 1) Update profile basics
    await sb.from("profiles").upsert({
      id: user.id,
      role,
      first_name: first || null,
      last_name: last || null,
    })

    // 2) If instructor, upsert instructor row
    if (role === "INSTRUCTOR") {
      await sb.from("instructors").upsert({
        user_id: user.id,
        bio: bio || null,
        lagree_level: level || null,
        equipment,
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        state: state || null,
        cv_url: cvUrl,
      }, { onConflict: "user_id" })
    }

    alert("Saved!")
    router.push("/profile")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First name</Label>
              <Input value={first} onChange={e => setFirst(e.target.value)} />
            </div>
            <div>
              <Label>Last name</Label>
              <Input value={last} onChange={e => setLast(e.target.value)} />
            </div>
            <div>
              <Label>State / Region</Label>
              <Input value={state} onChange={e => setState(e.target.value)} placeholder="e.g., VIC" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role ?? ""} onValueChange={(v: any) => setRole(v)}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                  <SelectItem value="STUDIO">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {role === "INSTRUCTOR" && (
            <>
              <div>
                <Label>Bio</Label>
                <Textarea rows={5} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell studios about your Lagree coaching style, experience, and availability…" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Lagree Level</Label>
                  <Select value={level} onValueChange={(v: any) => setLevel(v)}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1</SelectItem>
                      <SelectItem value="L2">L2</SelectItem>
                      <SelectItem value="L3">L3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Equipment</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EQUIP.map(e => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => toggleEquipment(e)}
                        className={`px-3 py-1.5 rounded-full border text-sm ${equipment.includes(e) ? "bg-orange-100 border-orange-300 text-orange-700" : "bg-white border-gray-200"}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label>Skills (comma separated)</Label>
                <Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g., Programming, Micro setup, Corporate events" />
              </div>

              <div>
                <Label>Upload CV (PDF)</Label>
                <Input type="file" accept="application/pdf" onChange={(e) => {
                  const f = e.target.files?.[0]; if (f) onUploadCV(f)
                }} />
                {cvUrl && (
                  <a href={cvUrl} target="_blank" rel="noreferrer" className="text-orange-600 underline text-sm mt-2 inline-block">
                    Preview current CV
                  </a>
                )}
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button onClick={save} className="bg-orange-500 hover:bg-orange-600">Save</Button>
            <Button variant="outline" onClick={() => history.back()}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
