import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET() {
  const supabase = createServiceClient()
  const { data } = await supabase.from("sample_requests").select("*, products(name), profiles!influencer_id(name)").order("created_at", { ascending: false })
  return NextResponse.json(data || [])
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()
  const { error } = await supabase.from("sample_requests").update({ status: body.status }).eq("id", body.request_id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
