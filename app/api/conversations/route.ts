import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = await createClient()
  const { data: { user }, error: authErr } = await sb.auth.getUser()
  if (authErr || !user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const { otherUserId }:{ otherUserId: string } = await req.json()

  if (!otherUserId) {
    return NextResponse.json({ error: "Missing otherUserId" }, { status: 400 })
  }

  // 1) See if a 2-party conversation already exists
  const { data: existing } = await sb
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", user.id)

  if (existing && existing.length) {
    const ids = existing.map(e => e.conversation_id)
    const { data: convs } = await sb
      .from("conversation_participants")
      .select("conversation_id, user_id")
      .in("conversation_id", ids)
      .eq("user_id", otherUserId)

    if (convs && convs.length) {
      // Return the first conversation both share
      return NextResponse.json({ id: convs[0].conversation_id })
    }
  }

  // 2) Create new conversation + add both users
  const { data: conv, error: convErr } = await sb
    .from("conversations")
    .insert({ created_by: user.id })
    .select("id")
    .single()
  if (convErr) return NextResponse.json({ error: convErr.message }, { status: 400 })

  const { error: cpErr } = await sb.from("conversation_participants").insert([
    { conversation_id: conv.id, user_id: user.id },
    { conversation_id: conv.id, user_id: otherUserId },
  ])
  if (cpErr) return NextResponse.json({ error: cpErr.message }, { status: 400 })

  return NextResponse.json({ id: conv.id })
}
