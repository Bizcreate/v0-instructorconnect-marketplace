"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function UserBadgeClient() {
  const sb = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    sb.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return
      setEmail(user?.email ?? null)
    })
    return () => { mounted = false }
  }, [sb])

  if (!email) {
    return (
      <Link href="/login" className="text-orange-600 underline">
        Sign in
      </Link>
    )
  }
  return <span className="text-sm text-gray-700">Hi, {email}</span>
}
