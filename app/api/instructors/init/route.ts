import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

  const { bio, lagree_level, equipment } = await req.json()

  // Upsert instructor row (user_id must match auth.uid())
  const { error } = await sb.from("instructors").upsert({
    user_id: user.id,
    bio: bio ?? null,
    lagree_level: lagree_level ?? "L1",
    equipment: equipment ?? ["M3K"]
  }, { onConflict: "user_id" })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
