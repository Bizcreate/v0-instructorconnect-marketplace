// app/api/conversations/[id]/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const me = await getCurrentUser()
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const isMember = await prisma.conversationMember.findFirst({
    where: { conversationId: params.id, userId: me.id },
    select: { id: true },
  })
  if (!isMember) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const convo = await prisma.conversation.findUnique({
    where: { id: params.id },
    include: {
      members: { include: { user: true } },
      messages: { include: { sender: true }, orderBy: { createdAt: "asc" }, take: 200 },
    },
  })
  return NextResponse.json(convo)
}
