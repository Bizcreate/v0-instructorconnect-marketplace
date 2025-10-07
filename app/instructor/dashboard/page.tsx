// app/instructor/dashboard/page.tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import InstructorDashboard from "./parts/InstructorDashboard"

export default async function InstructorDashboardPage() {
  const sb = createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await sb
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile) redirect("/onboarding")
  if (profile.role !== "INSTRUCTOR") redirect("/studio/dashboard")

  return <InstructorDashboard />
}
