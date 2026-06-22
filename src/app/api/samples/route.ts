import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function POST(req: Request) {
  const body = await req.json()
  const svc = createServiceClient()

  const { data: profiles } = await svc.from("profiles").select("id").eq("email", body.email).maybeSingle()
  const influencerId = profiles?.id || null

  const { error } = await svc.from("sample_requests").insert({
    influencer_id: influencerId,
    product_id: body.product_id,
    shipping_address: body.shipping_address,
    notes: body.notes,
    status: "pending",
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
