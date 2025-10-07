"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { createClient as createSbClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  sender_id: string
  body: string
  created_at: string
}

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>()
  const sb = useMemo(() => createSbClient(), [])
  const [me, setMe] = useState<string | null>(null)
  const [msgs, setMsgs] = useState<Message[]>([])
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // who am I?
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user } } = await sb.auth.getUser()
      if (mounted) setMe(user?.id ?? null)
    })()
    return () => { mounted = false }
  }, [sb])

  // load existing + subscribe
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await sb
        .from("messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true })
      if (mounted) setMsgs((data as any) ?? [])
    })()

    const channel = sb
      .channel(`conv:${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` },
        (payload) => {
          setMsgs(prev => [...prev, payload.new as any])
        }
      )
      .subscribe()

    return () => { sb.removeChannel(channel) }
  }, [id, sb])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs.length])

  const send = async () => {
    if (!text.trim()) return
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: id, body: text.trim() }),
    })
    setText("")
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>

      <div className="border rounded-lg p-4 h-[60vh] overflow-y-auto bg-white">
        {msgs.map(m => (
          <div key={m.id} className={`mb-3 flex ${m.sender_id === me ? "justify-end" : "justify-start"}`}>
            <div className={`rounded-2xl px-3 py-2 text-sm ${m.sender_id === me ? "bg-orange-500 text-white" : "bg-gray-100"}`}>
              {m.body}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <Input
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => (e.key === "Enter" ? send() : null)}
        />
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={send}>Send</Button>
      </div>
    </div>
  )
}
