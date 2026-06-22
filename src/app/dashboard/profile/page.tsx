"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function DashboardProfile() {
  const [saving, setSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Profile updated!")
    setSaving(false)
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
              <Input defaultValue="Your Name" className="mt-1.5 border-white/10 bg-white/5 text-white" />
            </div>
            <div>
              <Label className="text-sm text-white/60">Email</Label>
              <Input defaultValue="you@email.com" className="mt-1.5 border-white/10 bg-white/5 text-white" />
            </div>
          </div>
          <div>
            <Label className="text-sm text-white/60">WhatsApp Number</Label>
            <Input defaultValue="+263 7XX XXX XXX" className="mt-1.5 border-white/10 bg-white/5 text-white" />
          </div>
          <div>
            <Label className="text-sm text-white/60">TikTok Handle</Label>
            <Input placeholder="@yourhandle" className="mt-1.5 border-white/10 bg-white/5 text-white" />
          </div>
          <div>
            <Label className="text-sm text-white/60">Instagram Handle</Label>
            <Input placeholder="@yourhandle" className="mt-1.5 border-white/10 bg-white/5 text-white" />
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
