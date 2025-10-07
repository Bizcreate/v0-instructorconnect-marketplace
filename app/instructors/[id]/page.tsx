import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, BadgeCheck, FileText } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function InstructorPublicPage({ params }: { params: { id: string } }) {
  const sb = await createClient()

  const { data: instructor } = await sb
    .from("instructors")
    .select("id,user_id,bio,availability_text,experience_years,skills,equipment,lagree_level,state,is_active,cv_url,created_at, user:profiles!inner(id, first_name, last_name)")
    .eq("id", params.id)
    .maybeSingle()

  if (!instructor) return notFound()

  const fullName =
    `${instructor.user?.first_name ?? ""} ${instructor.user?.last_name ?? ""}`.trim() || "Lagree Instructor"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600">
            <span className="inline-flex items-center"><MapPin className="h-4 w-4 mr-1" />{instructor.state ?? "Australia"}</span>
            <Badge variant="secondary">Level {instructor.lagree_level}</Badge>
            <div className="flex flex-wrap gap-2">
              {(instructor.equipment ?? []).map((e: string) => (
                <Badge key={e} variant="outline">{e}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/messages/new?to=${instructor.user_id}`} className="btn bg-orange-500 text-white px-4 py-2 rounded-md">
            Message
          </Link>
          <Link href={`/interviews/new?instructor=${instructor.id}`} className="btn border px-4 py-2 rounded-md">
            Schedule Interview
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-800 whitespace-pre-wrap">{instructor.bio || "No bio yet."}</p>

            <div>
              <div className="text-sm font-semibold mb-1">Experience</div>
              <div className="text-gray-700">{instructor.experience_years ?? "–"}</div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-1">Skills</div>
              <div className="flex flex-wrap gap-2">
                {(instructor.skills ?? []).length
                  ? instructor.skills.map((s: string) => <Badge key={s} variant="outline">{s}</Badge>)
                  : <span className="text-gray-500">No skills listed</span>}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-1">Availability Notes</div>
              <div className="text-gray-700 whitespace-pre-wrap">{instructor.availability_text ?? "–"}</div>
            </div>

            {instructor.cv_url && (
              <a
                href={instructor.cv_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-orange-600 underline"
              >
                <FileText className="h-4 w-4" /> View CV (PDF)
              </a>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-green-600" />
              Verified Lagree Coach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <div>• Certifications checked by studio or admin</div>
            <div>• Equipped experience: {(instructor.equipment ?? []).join(", ") || "—"}</div>
            <div>• Level: {instructor.lagree_level}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
