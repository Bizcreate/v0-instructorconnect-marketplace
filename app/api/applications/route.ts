import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const sb = createClient()
  const { jobId, applicantId, coverLetter } = await req.json()
  if (!jobId || !applicantId) return NextResponse.json({ error: "jobId and applicantId required" }, { status: 400 })

  const { error } = await sb.from("applications").insert({
    job_id: jobId,
    applicant_id: applicantId,
    cover_letter: coverLetter ?? null
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
