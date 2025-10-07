// lib/auth.ts
import { prisma } from "@/lib/prisma"

export type SessionUser = {
  id: string
  email: string
  userType: "STUDIO" | "INSTRUCTOR"
  firstName?: string | null
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  // TODO: replace with real session. For now, pick the first user.
  const u = await prisma.user.findFirst()
  if (!u) return null
  return {
    id: u.id,
    email: u.email,
    userType: u.userType,
    firstName: u.firstName,
  }
}
