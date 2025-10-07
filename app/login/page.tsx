"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const sb = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm space-y-4 bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold">Sign in</h1>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={loading}
          onClick={async ()=>{
            setError(null); setLoading(true)
            const { error } = await sb.auth.signInWithPassword({ email, password })
            setLoading(false)
            if (error) { setError(error.message); return }
            // optional: init profile if first time
            await fetch("/api/profiles/init", { method:"POST" })
            location.href = "/dashboard"
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-sm text-gray-600">
          No account? <Link href="/register" className="text-orange-600 underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
