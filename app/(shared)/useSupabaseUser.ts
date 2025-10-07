"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function useSupabaseUser() {
  const sb = createClient()
  const [user, setUser] = useState<null | { id: string; email?: string }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user } } = await sb.auth.getUser()
      if (mounted) {
        setUser(user ? { id: user.id, email: user.email ?? undefined } : null)
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, []) // sb is stable

  return { user, loading }
}
