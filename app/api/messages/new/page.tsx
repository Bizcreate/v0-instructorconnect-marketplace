import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function NewMessagePage({ searchParams }: { searchParams: { to?: string, prefill?: string } }) {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect("/login")

  const otherUserId = searchParams.to
  if (!otherUserId) redirect("/messages")

  // create or reuse conversation via API (server-side call)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otherUserId }),
    cache: "no-store",
  })

  if (!res.ok) redirect("/messages")
  const { id } = await res.json()

  // If a prefill is present, drop a first message
  if (searchParams.prefill) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: id, body: searchParams.prefill }),
      cache: "no-store",
    })
  }

  redirect(`/messages/${id}`)
}
