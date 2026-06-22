import { createClient } from "@/lib/supabase/server"

export default async function AdminOverview() {
  const supabase = await createClient()

  const { count: influencers } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "influencer")
  const { count: products } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "active")
  const { count: orders } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { data: revenueData } = await supabase.from("orders").select("total_amount")
  const revenue = (revenueData || []).reduce((s, r) => s + Number(r.total_amount), 0)

  const stats = [
    { label: "Total Influencers", value: influencers ?? 0 },
    { label: "Active Products", value: products ?? 0 },
    { label: "Total Orders", value: orders ?? 0 },
    { label: "Total Revenue", value: `$${revenue.toFixed(2)}` },
  ]

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-white/40">Manage your SokoLink platform.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <p className="text-sm text-white/40">{s.label}</p>
            <p className="mt-2 text-3xl font-light text-white">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
