import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = createClient()
  const { instructorId, start_ts, end_ts, kind, location, notes, rate_min, rate_unit } = await req.json()
  if (!instructorId || !start_ts || !end_ts) {
    return NextResponse.json({ error: "instructorId, start_ts, end_ts required" }, { status: 400 })
  }

  const { error } = await sb.from("availability").insert({
    instructor_id: instructorId,
    start_ts, end_ts, kind: kind ?? "Cover",
    location: location ?? null, notes: notes ?? null,
    rate_min: rate_min ?? null, rate_unit: rate_unit ?? "class"
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
