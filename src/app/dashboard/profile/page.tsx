"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function DashboardProfile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tiktok_handle: "", instagram_handle: "" })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/profile")
      .then(r => r.json())
      .then(d => {
        if (d && !d.error) {
          setForm({
            name: d.name || "", email: d.email || "",
            phone: d.phone || "", tiktok_handle: d.tiktok_handle || "",
            instagram_handle: d.instagram_handle || "",
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) toast.success("Profile updated!")
      else toast.error("Error saving profile")
    } catch { toast.error("Network error") }
    setSaving(false)
  }

  if (loading) {
    return <div className="py-16 text-center"><p className="text-sm text-white/30">Loading...</p></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Profile</h1>
      <p className="mt-1 text-sm text-white/40">Manage your account and social links.</p>
      <div className="mt-8 max-w-lg">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-white/60">Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 border-white/10 bg-white/5 text-white" />
            </div>
            <div>
              <Label className="text-sm text-white/60">Email</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 border-white/10 bg-white/5 text-white" />
            </div>
          </div>
          <div>
            <Label className="text-sm text-white/60">WhatsApp Number</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="+263 7XX XXX XXX" />
          </div>
          <div>
            <Label className="text-sm text-white/60">TikTok Handle</Label>
            <Input value={form.tiktok_handle} onChange={(e) => setForm({ ...form, tiktok_handle: e.target.value })}
              className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="@yourhandle" />
          </div>
          <div>
            <Label className="text-sm text-white/60">Instagram Handle</Label>
            <Input value={form.instagram_handle} onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
              className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="@yourhandle" />
          </div>
          <Button type="submit" disabled={saving}
            className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  )
}
