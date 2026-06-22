import { createClient } from "./server"
import type { Product, Order, Commission, SampleRequest, Profile } from "@/types/database"

export async function getActiveProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("*").eq("status", "active").order("created_at", { ascending: false })
  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("*").eq("id", id).single()
  return data
}

export async function getOrdersByInfluencer(influencerId: string): Promise<any[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("orders").select("*, products(name)").eq("influencer_id", influencerId).order("created_at", { ascending: false })
  return data || []
}

export async function getAllOrders(): Promise<any[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("orders").select("*, products(name), profiles!influencer_id(name)").order("created_at", { ascending: false })
  return data || []
}

export async function getCommissionSummary(influencerId: string): Promise<{ total: number; pending: number; paid: number }> {
  const supabase = await createClient()
  const { data } = await supabase.from("commissions").select("amount, status").eq("influencer_id", influencerId)
  const list = data || []
  const total = list.reduce((s, c) => s + Number(c.amount), 0)
  const pending = list.filter((c) => c.status === "pending").reduce((s, c) => s + Number(c.amount), 0)
  const paid = list.filter((c) => c.status === "paid").reduce((s, c) => s + Number(c.amount), 0)
  return { total, pending, paid }
}

export async function getPendingProfiles(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("profiles").select("*").eq("status", "pending").order("created_at", { ascending: false })
  return data || []
}

export async function getActiveInfluencers(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("profiles").select("*").eq("role", "influencer").order("created_at", { ascending: false })
  return data || []
}

export async function getSampleRequests(): Promise<any[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("sample_requests").select("*, products(name), profiles!influencer_id(name)").order("created_at", { ascending: false })
  return data || []
}

export async function getLeaderboard(limit = 10): Promise<{ name: string; total: number }[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("commissions")
    .select("influencer_id, amount, profiles!influencer_id(name)")
    .eq("status", "paid")
  if (!data) return []
  const map: Record<string, { name: string; total: number }> = {}
  for (const row of data) {
    const name = (row.profiles as any)?.name || "Unknown"
    if (!map[row.influencer_id]) map[row.influencer_id] = { name, total: 0 }
    map[row.influencer_id].total += Number(row.amount)
  }
  return Object.values(map).sort((a, b) => b.total - a.total).slice(0, limit)
}
