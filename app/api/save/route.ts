import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = createClient()
  const { jobId, saved } = await req.json()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  if (saved) {
    const { error } = await sb.from("saved_jobs").insert({ user_id: user.id, job_id: jobId })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  } else {
    const { error } = await sb.from("saved_jobs")
      .delete().match({ user_id: user.id, job_id: jobId })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
