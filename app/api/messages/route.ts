import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const { conversationId, body } = await req.json()
  if (!conversationId || !body) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  // RLS ensures the sender is a participant
  const { error } = await sb.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
