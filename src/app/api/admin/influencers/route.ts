import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET() {
  const supabase = createServiceClient()
  const { data } = await supabase.from("profiles").select("*").eq("role", "influencer").order("created_at", { ascending: false })
  return NextResponse.json(data || [])
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()
  const { error } = await supabase.from("profiles").update({ status: body.status }).eq("id", body.profile_id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
