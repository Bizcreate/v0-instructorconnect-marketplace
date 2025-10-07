import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function MyProfilePage() {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect("/login")

  const { data: instructor } = await sb
    .from("instructors")
    .select("id,bio,experience_years,skills,equipment,lagree_level,state,cv_url")
    .eq("user_id", user.id)
    .maybeSingle()

  const { data: profile } = await sb
    .from("profiles")
    .select("first_name,last_name,role")
    .eq("id", user.id)
    .maybeSingle()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {`${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() || user.email}
          </h1>
          <p className="text-gray-600">Role: {profile?.role ?? "—"}</p>
        </div>
        <Link href="/profile/edit" className="btn border px-4 py-2 rounded-md">Edit Profile</Link>
      </div>

      {profile?.role === "INSTRUCTOR" ? (
        <Card>
          <CardHeader><CardTitle>Instructor Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <div className="font-medium">Level</div>
              <Badge variant="secondary">Level {instructor?.lagree_level ?? "—"}</Badge>
            </div>

            <div className="text-sm">
              <div className="font-medium">Equipment</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(instructor?.equipment ?? []).length
                  ? instructor?.equipment?.map(e => <Badge key={e} variant="outline">{e}</Badge>)
                  : <span className="text-gray-500">—</span>}
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium">Skills</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {(instructor?.skills ?? []).length
                  ? instructor?.skills?.map(s => <Badge key={s} variant="outline">{s}</Badge>)
                  : <span className="text-gray-500">—</span>}
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium">Bio</div>
              <p className="text-gray-700 whitespace-pre-wrap">{instructor?.bio ?? "—"}</p>
            </div>

            {instructor?.cv_url && (
              <a href={instructor.cv_url} target="_blank" rel="noreferrer" className="text-orange-600 underline">
                View CV
              </a>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Studio Profile</CardTitle></CardHeader>
          <CardContent className="text-gray-600">
            Connect your studio in the studio dashboard (Post Jobs, Manage Applicants).
          </CardContent>
        </Card>
      )}
    </div>
  )
}
