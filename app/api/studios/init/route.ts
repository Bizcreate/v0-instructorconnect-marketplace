import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  const { name, state } = await req.json()
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 })

  // upsert profile role
  await sb.from("profiles").upsert({ id: user.id, role: "STUDIO" })

  // create studio
  const { error } = await sb.from("studios").insert({
    owner_id: user.id,
    name,
    state: state ?? null
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
