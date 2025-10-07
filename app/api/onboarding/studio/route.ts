import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
    try {
      const sb = createClient()
      const { data: { user }, error: userErr } = await sb.auth.getUser()
      console.log("[studio] getUser:", { user, userErr }) // <— log
  
      if (userErr || !user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  
      const body = await req.json().catch(() => ({}))
      console.log("[studio] body:", body) // <— log
  
    // Ensure a profile row exists, set role=STUDIO
    const { data: prof, error: profSelErr } = await sb
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()
    if (profSelErr) throw profSelErr

    if (!prof) {
      const { error: insErr } = await sb
        .from("profiles")
        .insert({ id: user.id, role: "STUDIO", state: state ?? null })
      if (insErr) throw insErr
    } else {
      const { error: upErr } = await sb
        .from("profiles")
        .update({ role: "STUDIO", state: state ?? null })
        .eq("id", user.id)
      if (upErr) throw upErr
    }

    // Create or update studio tied to this owner
    const { data: existing, error: findErr } = await sb
      .from("studios")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle()
    if (findErr) throw findErr

    let studioId = existing?.id ?? null

    if (!studioId) {
      const { data, error } = await sb
        .from("studios")
        .insert({
          owner_id: user.id,
          name,
          address: address ?? null,
          description: description ?? null,
          size,
          state: state ?? null,
        })
        .select("id")
        .single()
      if (error) throw error
      studioId = data.id
    } else {
      const { error } = await sb
        .from("studios")
        .update({
          name,
          address: address ?? null,
          description: description ?? null,
          size,
          state: state ?? null,
        })
        .eq("id", studioId)
      if (error) throw error
    }

    return NextResponse.json({ ok: true, studioId })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to onboard studio" }, { status: 500 })
  }
}
