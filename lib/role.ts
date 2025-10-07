// lib/role.ts
import { createClient } from "@/lib/supabase/server"

export type AppRole = "STUDIO" | "INSTRUCTOR" | null

export async function getCurrentRole(): Promise<AppRole> {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return null

  const { data: profile } = await sb
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  return (profile?.role as AppRole) ?? null
}
