// app/studio/dashboard/page.tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import StudioDashboard from "./parts/StudioDashboard"

export default async function StudioDashboardPage() {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect("/login")

  // check role from profiles
  const { data: profile } = await sb
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile) redirect("/onboarding")           // no profile yet
  if (profile.role !== "STUDIO") redirect("/instructor/dashboard")

  return <StudioDashboard />
}
