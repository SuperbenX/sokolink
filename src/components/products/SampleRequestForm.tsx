"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface SampleRequestFormProps {
  productId: string
  productName: string
}

export function SampleRequestForm({ productId, productName }: SampleRequestFormProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, email: form.email, shipping_address: form.phone, notes: form.message + "\nName: " + form.name }),
      })
      if (res.ok) {
        toast.success("Request submitted! We'll be in touch via WhatsApp.")
      } else {
        const data = await res.json()
        toast.error(data.error || "Error submitting request")
      }
    } catch { toast.error("Network error") }
    setForm({ name: "", email: "", phone: "", message: "" })
    setOpen(false)
    setSending(false)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] px-8">
        Request Sample
      </Button>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-base font-medium text-white">Request a Sample</h3>
      <p className="mt-1 text-sm text-white/40">
        Interested in promoting {productName}? Request a sample to review.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm text-white/60">Full Name</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm text-white/60">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="your@email.com" />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm text-white/60">WhatsApp Number</Label>
          <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="+263 7XX XXX XXX" />
        </div>
        <div>
          <Label htmlFor="message" className="text-sm text-white/60">Notes (optional)</Label>
          <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Your audience size, platforms, etc." rows={3} />
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={sending}
            className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] flex-1">
            {sending ? "Sending..." : "Submit Request"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-white/60">Cancel</Button>
        </div>
      </form>
    </div>
  )
}
