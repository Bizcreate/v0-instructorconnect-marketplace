"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  toUserId: string
  defaultSubject?: string
}

export default function MessageDialog({ open, onOpenChange, toUserId, defaultSubject }: Props) {
  const [subject, setSubject] = React.useState(defaultSubject ?? "")
  const [text, setText] = React.useState("")
  const [pending, setPending] = React.useState(false)

  async function send() {
    setPending(true)
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUserId, subject, text }),
    })
    setPending(false)
    if (res.ok) {
      onOpenChange(false)
      setText("")
    } else {
      alert("Failed to send message.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Intro chat" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} placeholder="Tell them what you liked and propose next steps…" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=>onOpenChange(false)}>Cancel</Button>
          <Button onClick={send} disabled={pending} className="bg-orange-500 hover:bg-orange-600">
            {pending ? "Sending…" : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
