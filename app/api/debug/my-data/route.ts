import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: "no user" }, { status: 401 })

  const [{ data: profile }, { data: studio }, { data: instructor }] = await Promise.all([
    sb.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    sb.from("studios").select("*").eq("owner_id", user.id),
    sb.from("instructors").select("*").eq("user_id", user.id).maybeSingle(),
  ])

  return NextResponse.json({ user: { id: user.id, email: user.email }, profile, studio, instructor })
}
