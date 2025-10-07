import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  const sb = createClient()
  const { data: { user }, error: userErr } = await sb.auth.getUser()
  if (userErr || !user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  // Try to read
  const { data: prof } = await sb.from("profiles").select("*").eq("id", user.id).maybeSingle()
  if (prof) return NextResponse.json({ ok: true, existed: true })

  // Default role is INSTRUCTOR (you can change this in your register flow)
  const { error } = await sb.from("profiles").insert({
    id: user.id,
    role: "INSTRUCTOR",
    first_name: user.user_metadata?.first_name ?? null,
    last_name: user.user_metadata?.last_name ?? null,
    state: null
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true, created: true })
}
