"use client"

import { Button } from "@/components/ui/button"

export default function MessageButton({
  otherUserId,
  label = "Message",
}: {
  otherUserId: string
  label?: string
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otherUserId }),
        })
        const json = await res.json()
        if (json?.conversationId) window.location.href = `/inbox/${json.conversationId}`
      }}
    >
      {label}
    </Button>
  )
}
