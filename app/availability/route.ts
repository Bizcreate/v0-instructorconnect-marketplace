// app/api/availability/route.ts
import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

// Optional: mark dynamic for safety with cookies()
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const sb = await createServerSupabase()

    // who is making the request?
    const {
      data: { user },
      error: userErr,
    } = await sb.auth.getUser()
    if (userErr) throw userErr
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const payload = await req.json().catch(() => null)
    if (!payload) return NextResponse.json({ error: "Bad JSON" }, { status: 400 })

    const {
      // expected fields
      start_ts,        // ISO, e.g. "2025-09-23T10:00:00Z"
      end_ts,          // ISO
      kind = "Cover",  // 'Cover' | 'Recurring Class' | 'Private'
      location,
      notes,
      rate_min,
      rate_unit = "class",
    } = payload

    if (!start_ts || !end_ts) {
      return NextResponse.json({ error: "start_ts and end_ts required" }, { status: 400 })
    }

    // find this user's instructor row
    const { data: instructor, error: iErr } = await sb
      .from("instructors")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (iErr) throw iErr
    if (!instructor?.id) {
      return NextResponse.json(
        { error: "No instructor profile found for this user." },
        { status: 400 }
      )
    }

    // insert availability
    const { data, error } = await sb
      .from("availability")
      .insert({
        instructor_id: instructor.id,
        start_ts,
        end_ts,
        kind,
        location,
        notes,
        rate_min,
        rate_unit,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ ok: true, availability: data })
  } catch (e: any) {
    console.error("AVAILABILITY_POST_ERROR", e)
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 400 })
  }
}
