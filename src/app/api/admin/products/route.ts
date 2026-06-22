import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET() {
  const supabase = createServiceClient()
  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("products").insert({
    name: body.name,
    description: body.description,
    category: body.category,
    price_usd: parseFloat(body.price_usd) || 0,
    wholesale_price: body.wholesale_price ? parseFloat(body.wholesale_price) : null,
    commission_rate: 0,
    stock: 0,
    images: body.images || [],
    status: "active",
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()
  const { error } = await supabase.from("products").update(body.fields).eq("id", body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  const supabase = createServiceClient()
  const { error } = await supabase.from("products").delete().eq("id", body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
