import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET() {
  const svc = createServiceClient()
  const { data } = await svc.from("orders").select("*, products(name)").order("created_at", { ascending: false })
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const svc = createServiceClient()

  // Get product wholesale price
  const { data: product } = await svc.from("products").select("wholesale_price, price_usd").eq("id", body.product_id).single()
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const unitPrice = product.wholesale_price || product.price_usd
  const qty = parseInt(body.quantity) || 1
  const total = unitPrice * qty

  const { data: profile } = await svc.from("profiles").select("id").eq("email", body.email).maybeSingle()
  const influencerId = profile?.id || null

  const { data, error } = await svc.from("orders").insert({
    influencer_id: influencerId,
    product_id: body.product_id,
    quantity: qty,
    total_amount: total,
    status: "new",
    customer_name: body.customer_name || "Walk-in",
    customer_phone: body.customer_phone || null,
    delivery_address: body.delivery_address || null,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
