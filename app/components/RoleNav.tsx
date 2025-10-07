// app/components/RoleNav.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentRole } from "@/lib/role"

export default async function RoleNav() {
  const role = await getCurrentRole()

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/jobs" className="text-gray-600 hover:text-orange-500">Browse Jobs</Link>
      {role === "STUDIO" && (
        <Link href="/browse-instructors" className="text-gray-600 hover:text-orange-500">Find Instructors</Link>
      )}
      {role === "INSTRUCTOR" && (
        <Link href="/availability" className="text-gray-600 hover:text-orange-500">Availability</Link>
      )}
      {role && (
        <Link href="/dashboard" className="text-orange-500 font-medium">Dashboard</Link>
      )}
      {!role && (
        <>
          <Button asChild variant="outline"><Link href="/login">Sign in</Link></Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600"><Link href="/register">Get started</Link></Button>
        </>
      )}
      {role === "STUDIO" && (
        <Button asChild className="bg-orange-500 hover:bg-orange-600"><Link href="/post-job">Post Job</Link></Button>
      )}
      {role === "INSTRUCTOR" && (
        <Button asChild className="bg-orange-500 hover:bg-orange-600"><Link href="/post-availability">Post Availability</Link></Button>
      )}
    </nav>
  )
}
