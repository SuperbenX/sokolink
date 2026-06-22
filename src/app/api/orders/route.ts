import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data } = await supabase.from("orders").select("*, products(name)").eq("influencer_id", user.id).order("created_at", { ascending: false })
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: product } = await supabase.from("products").select("price_usd, commission_rate").eq("id", body.product_id).single()
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const totalAmount = Number(product.price_usd) * body.quantity
  const commissionAmount = totalAmount * Number(product.commission_rate)

  const { data: order, error } = await supabase.from("orders").insert({
    influencer_id: user.id, product_id: body.product_id,
    quantity: body.quantity, total_amount: totalAmount,
    commission_amount: commissionAmount,
    customer_name: body.customer_name, customer_phone: body.customer_phone, delivery_address: body.delivery_address,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await supabase.from("commissions").insert({ order_id: order.id, influencer_id: user.id, amount: commissionAmount })
  return NextResponse.json({ success: true, order })
}
