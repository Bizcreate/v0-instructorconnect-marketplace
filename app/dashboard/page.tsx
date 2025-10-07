"use client"

import { useSearchParams } from "next/navigation"
import InstructorDashboard from "./parts/InstructorDashboard"
import StudioDashboard from "./parts/StudioDashboard"

export default function DashboardPage() {
  const params = useSearchParams()
  const type = params.get("type") === "studio" ? "studio" : "instructor" // default to instructor

  return type === "studio" ? <StudioDashboard /> : <InstructorDashboard />
}
