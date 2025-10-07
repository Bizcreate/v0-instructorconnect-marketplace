"use client"

import { useEffect, useState } from "react"
import { createClient as createSbClient } from "@/lib/supabase/client"

type Role = "STUDIO" | "INSTRUCTOR" | null

export function useUserRole() {
  const sb = createSbClient()
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      // 1) Get user
      const { data: { user } } = await sb.auth.getUser()
      if (!user) {
        if (alive) { setRole(null); setLoading(false) }
        return
      }

      // 2) Try profiles.role
      const { data: prof, error } = await sb
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle()

      if (!error && prof?.role) {
        if (alive) { setRole(prof.role as Role); setLoading(false) }
        return
      }

      // 3) Self-heal: infer from records (if they completed a form earlier)
      const [{ data: studio }, { data: instr }] = await Promise.all([
        sb.from("studios").select("id").eq("owner_id", user.id).limit(1).maybeSingle(),
        sb.from("instructors").select("id").eq("user_id", user.id).limit(1).maybeSingle(),
      ])

      const inferred: Role = studio?.id ? "STUDIO" : instr?.id ? "INSTRUCTOR" : null

      if (inferred) {
        // 4) Upsert profiles.role so future pages get it instantly
        await sb.from("profiles").upsert({ id: user.id, role: inferred })
        if (alive) { setRole(inferred); setLoading(false) }
      } else {
        if (alive) { setRole(null); setLoading(false) }
      }
    })()

    return () => { alive = false }
  }, [sb])

  return { role, loading }
}
