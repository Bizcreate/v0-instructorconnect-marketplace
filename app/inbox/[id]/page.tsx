// app/inbox/[id]/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any>(null)
  const [msg, setMsg] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  async function load() {
    const res = await fetch(`/api/conversations/${id}`)
    const json = await res.json()
    setData(json)
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 0)
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 3000) // simple polling MVP
    return () => clearInterval(t)
  }, [id])

  const send = async () => {
    const body = msg.trim()
    if (!body) return
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: id, body }),
    })
    setMsg("")
    load()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Conversation</h1>

      <div className="border rounded-lg p-4 h-[60vh] overflow-y-auto space-y-3 bg-white">
        {data?.messages?.map((m: any) => (
          <div key={m.id} className="flex flex-col">
            <div className="text-sm text-gray-500">{m.sender?.firstName ?? m.sender?.email ?? "User"}</div>
            <div className="inline-block max-w-[80%] rounded-lg border px-3 py-2">{m.body}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Write a message…" />
        <Button onClick={send} className="bg-orange-500 hover:bg-orange-600">Send</Button>
      </div>
    </div>
  )
}
