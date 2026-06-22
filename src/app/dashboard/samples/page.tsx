"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Product {
  id: string; name: string
}

export default function DashboardSamples() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return
    setSending(true)
    try {
      const res = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProduct,
          shipping_address: address,
          notes: notes,
        }),
      })
      if (res.ok) {
        toast.success("Sample request submitted! We'll process it shortly.")
        setSelectedProduct("")
        setAddress("")
        setNotes("")
      } else {
        toast.error("Error submitting request")
      }
    } catch { toast.error("Network error") }
    setSending(false)
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
              {products.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121216]">{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm text-white/60">Shipping Address *</Label>
            <Textarea value={address} onChange={(e) => setAddress(e.target.value)}
              required className="mt-1.5 border-white/10 bg-white/5 text-white" rows={3}
              placeholder="Your full delivery address" />
          </div>
          <div>
            <Label className="text-sm text-white/60">Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 border-white/10 bg-white/5 text-white" rows={2} placeholder="Any specific requests?" />
          </div>
          <Button type="submit" disabled={sending || !selectedProduct}
            className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
            {sending ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  )
}
