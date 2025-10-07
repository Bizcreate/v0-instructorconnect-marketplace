import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
    try {
      const sb = createClient()
      const { data: { user }, error: userErr } = await sb.auth.getUser()
      console.log("[instructor] getUser:", { user, userErr }) // <— log
  
      if (userErr || !user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  
      const body = await req.json().catch(() => ({}))
      console.log("[instructor] body:", body) // <— log
  
    // Ensure a profile row exists, set role=INSTRUCTOR
    const { data: prof, error: profSelErr } = await sb
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()
    if (profSelErr) throw profSelErr

    if (!prof) {
      const { error: insErr } = await sb
        .from("profiles")
        .insert({
          id: user.id,
          role: "INSTRUCTOR",
          first_name: firstName ?? null,
          last_name: lastName ?? null,
          state: state ?? null,
        })
      if (insErr) throw insErr
    } else {
      const { error: upErr } = await sb
        .from("profiles")
        .update({
          role: "INSTRUCTOR",
          first_name: firstName ?? null,
          last_name: lastName ?? null,
          state: state ?? null,
        })
        .eq("id", user.id)
      if (upErr) throw upErr
    }

    // Create/update instructors (1:1 with user)
    const { data: existing, error: findErr } = await sb
      .from("instructors")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()
    if (findErr) throw findErr

    const payload = {
      bio: bio ?? null,
      experience_years: experienceYears ?? null,
      lagree_level: lagreeLevel,
      equipment,
      skills,
      state: state ?? null,
      cv_url: cvUrl ?? null,
      availability_text: availabilityText ?? null,
      is_active: true,
    }

    if (!existing) {
      const { error } = await sb
        .from("instructors")
        .insert({ user_id: user.id, ...payload })
      if (error) throw error
    } else {
      const { error } = await sb
        .from("instructors")
        .update(payload)
        .eq("user_id", user.id)
      if (error) throw error
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to onboard instructor" }, { status: 500 })
  }
}
