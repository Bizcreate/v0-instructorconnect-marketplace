// app/api/uploads/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get("file") as File | null
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  // TODO: store to S3/Cloudflare R2/etc. For now, return a fake URL.
  return NextResponse.json({ url: `/uploads/${encodeURIComponent(file.name)}` })
}
