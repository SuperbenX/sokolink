"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus } from "lucide-react"

interface Order {
  id: string; products: { name: string } | null
  quantity: number; total_amount: number; commission_amount: number
  status: string; customer_name: string; created_at: string
}

const products = [
  { id: "1", name: "Portable Power Station 500W" },
  { id: "2", name: "LED Rechargeable Camping Lantern" },
  { id: "3", name: "Premium Sportswear Set" },
  { id: "4", name: "Wireless Bluetooth Earbuds Pro" },
  { id: "5", name: "Solar LED Flood Light 200W" },
  { id: "6", name: "Casual Streetwear Hoodie" },
]

export default function DashboardOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ product_id: "", quantity: "1", customer_name: "", customer_phone: "", delivery_address: "" })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(setOrders).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quantity: parseInt(form.quantity) }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Order created! We'll process it shortly.")
        setOpen(false)
        setForm({ product_id: "", quantity: "1", customer_name: "", customer_phone: "", delivery_address: "" })
        // Refresh orders
        fetch("/api/orders").then(r => r.json()).then(setOrders).catch(() => {})
      } else {
        toast.error(data.error || "Error creating order")
      }
    } catch { toast.error("Network error") }
    setSending(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white">My Orders</h1>
          <p className="mt-1 text-sm text-white/40">Track and create customer orders.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2DD4BF] px-4 py-2 text-sm font-medium text-black hover:bg-[#5EEAD4] cursor-pointer">
              <Plus className="h-4 w-4" /> New Order
            </span>
          </DialogTrigger>
          <DialogContent className="border-white/10 bg-[#121216] text-white sm:max-w-lg">
            <DialogHeader><DialogTitle className="text-white">Create Order</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm text-white/60">Product *</Label>
                <select value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })} required
                  className="mt-1.5 flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white">
                  <option value="" className="bg-[#121216]">Select product...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#121216]">{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-white/60">Quantity</Label>
                  <Input type="number" min="1" value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
                <div>
                  <Label className="text-sm text-white/60">Customer Name *</Label>
                  <Input value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    required className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-white/60">Customer Phone</Label>
                  <Input value={form.customer_phone}
                    onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                    className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
                <div>
                  <Label className="text-sm text-white/60">Delivery Address</Label>
                  <Input value={form.delivery_address}
                    onChange={(e) => setForm({ ...form, delivery_address: e.target.value })}
                    className="mt-1.5 border-white/10 bg-white/5 text-white" />
                </div>
              </div>
              <Button type="submit" disabled={sending}
                className="w-full rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                {sending ? "Creating..." : "Create Order"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {orders.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Product", "Customer", "Qty", "Amount", "Commission", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 text-white/80">{(o.products as any)?.name || "—"}</td>
                  <td className="px-5 py-3 text-white/60">{o.customer_name}</td>
                  <td className="px-5 py-3 text-white/80">{o.quantity}</td>
                  <td className="px-5 py-3 text-white/80">${Number(o.total_amount).toFixed(2)}</td>
                  <td className="px-5 py-3 text-[#2DD4BF]">${Number(o.commission_amount).toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40 capitalize">{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-white/30">No orders yet. Click &quot;New Order&quot; to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}
