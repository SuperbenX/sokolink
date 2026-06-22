"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const statuses = ["new", "paid", "shipped", "delivered", "cancelled"]

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])

  const fetchOrders = () => {
    fetch("/api/admin/orders").then(r => r.json()).then(setOrders).catch(() => {})
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (orderId: string, status: string) => {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId, status }),
    })
    const data = await res.json()
    if (data.success) {
      toast.success(`Order ${status}`)
      fetchOrders()
    } else {
      toast.error(data.error || "Error")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Orders</h1>
      <p className="mt-1 text-sm text-white/40">Manage all orders across influencers.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {orders.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Order ID", "Product", "Influencer", "Customer", "Amount", "Commission", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/60 font-mono text-xs">{o.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-white/80">{(o.products as any)?.name || "—"}</td>
                  <td className="px-4 py-3 text-white/60">{(o.profiles as any)?.name || "—"}</td>
                  <td className="px-4 py-3 text-white/80">{o.customer_name}</td>
                  <td className="px-4 py-3 text-white/80">${Number(o.total_amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-[#2DD4BF]">${Number(o.commission_amount).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40 capitalize">{o.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white"
                    >
                      {statuses.map(s => (
                        <option key={s} value={s} className="bg-[#121216] capitalize">{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-white/30">No orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
