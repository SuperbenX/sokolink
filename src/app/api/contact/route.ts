import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function POST(req: Request) {
  const body = await req.json()
  const svc = createServiceClient()
  const { error } = await svc.from("sample_requests").insert({
    notes: `Contact form submission\nName: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    status: "pending",
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
