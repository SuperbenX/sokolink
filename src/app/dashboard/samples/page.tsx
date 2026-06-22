"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const availableProducts = [
  { id: "1", name: "Portable Power Station 500W" },
  { id: "2", name: "LED Rechargeable Camping Lantern" },
  { id: "3", name: "Premium Sportswear Set" },
  { id: "4", name: "Wireless Bluetooth Earbuds Pro" },
  { id: "5", name: "Solar LED Flood Light 200W" },
  { id: "6", name: "Casual Streetwear Hoodie" },
]

export default function DashboardSamples() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Sample request submitted! We'll process it shortly.")
    setSending(false)
    setSelectedProduct("")
    setAddress("")
    setNotes("")
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Request Samples</h1>
      <p className="mt-1 text-sm text-white/40">Request product samples to review before promoting.</p>
      <div className="mt-8 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-sm text-white/60">Product *</Label>
            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required
              className="mt-1.5 flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white">
              <option value="" className="bg-[#121216]">Select a product...</option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121216]">{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="address" className="text-sm text-white/60">Shipping Address *</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)}
              required className="mt-1.5 border-white/10 bg-white/5 text-white" rows={3}
              placeholder="Your full delivery address" />
          </div>
          <div>
            <Label htmlFor="notes" className="text-sm text-white/60">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 border-white/10 bg-white/5 text-white" rows={2} placeholder="Any specific requests?" />
          </div>
          <Button type="submit" disabled={sending}
            className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
            {sending ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-medium text-white">Previous Requests</h2>
        <div className="mt-4 rounded-2xl border border-white/5 bg-[#121216] py-12 text-center">
          <p className="text-sm text-white/30">No sample requests yet.</p>
        </div>
      </div>
    </div>
  )
}
