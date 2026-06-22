"use client"

import { useState, useEffect } from "react"
import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    earnings: 0, pending_earnings: 0,
    orders: 0, commission_rate: 15,
    products: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then((data) => {
      setRecentOrders(data || [])
      const total = (data || []).reduce((s: number, o: any) => s + Number(o.commission_amount || 0), 0)
      setStats(s => ({ ...s, earnings: total, orders: (data || []).length }))
    }).catch(() => {})
    fetch("/api/products").then(r => r.json()).then((data) => {
      setStats(s => ({ ...s, products: (data || []).length }))
    }).catch(() => {})
  }, [])

  const statCards = [
    { icon: DollarSign, label: "Total Earnings", value: `$${stats.earnings.toFixed(2)}`, sub: `Pending: $${stats.pending_earnings.toFixed(2)}` },
    { icon: ShoppingCart, label: "Orders", value: String(stats.orders), sub: "All time" },
    { icon: TrendingUp, label: "Commission Rate", value: `${stats.commission_rate}%`, sub: "Average across products" },
    { icon: Package, label: "Active Products", value: String(stats.products), sub: "Available to promote" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/40">Welcome back! Here&apos;s your performance overview.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
              <s.icon className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="mt-4 text-sm text-white/40">{s.label}</p>
            <p className="mt-1 text-2xl font-light text-white">{s.value}</p>
            <p className="mt-0.5 text-xs text-white/30">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-medium text-white">Recent Orders</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
          {recentOrders.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  {["Product", "Customer", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o: any) => (
                  <tr key={o.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-white/80">{(o.products as any)?.name || "—"}</td>
                    <td className="px-5 py-3 text-white/60">{o.customer_name}</td>
                    <td className="px-5 py-3 text-white/80">${Number(o.total_amount).toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40 capitalize">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-white/30">No orders yet. Start promoting products!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
