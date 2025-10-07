// app/inbox/page.tsx
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export default async function InboxPage() {
  const me = await getCurrentUser()
  if (!me) return <div className="p-8">Please sign in.</div>

  const convos = await prisma.conversation.findMany({
    where: { members: { some: { userId: me.id } } },
    orderBy: { updatedAt: "desc" },
    include: {
      members: { include: { user: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="space-y-2">
        {convos.map(c => {
          const other = c.members.map(m => m.user).find(u => u.id !== me.id)
          const last = c.messages[0]
          return (
            <Link key={c.id} href={`/inbox/${c.id}`} className="block rounded border p-3 hover:bg-orange-50">
              <div className="font-medium">{other ? `${other.firstName ?? ""} ${other.lastName ?? ""}`.trim() || other.email : "Conversation"}</div>
              <div className="text-sm text-gray-600 truncate">{last ? last.body : "No messages yet"}</div>
            </Link>
          )
        })}
        {!convos.length && <div className="rounded border p-6 text-gray-600">No conversations yet.</div>}
      </div>
    </div>
  )
}
