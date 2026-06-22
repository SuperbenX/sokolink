"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function ApplyPage() {
  const [step, setStep] = useState<"form" | "success">("form")
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ email: string; password: string; name: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "",
    platform: "", followerCount: "", niche: "", message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    setAlreadyRegistered(false)

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        setResult({ email: data.email, password: data.password, name: data.name })
        setStep("success")
      } else if (data.alreadyRegistered) {
        setAlreadyRegistered(true)
        setError(data.error)
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setSending(false)
  }

  if (step === "success" && result) {
    return (
      <div className="px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2DD4BF]/10">
            <CheckCircle className="h-8 w-8 text-[#2DD4BF]" />
          </div>
          <h1 className="mt-6 text-3xl font-light tracking-[-0.64px] text-white">
            Application Submitted!
          </h1>
          <p className="mt-3 text-base text-white/60">
            Welcome, {result.name}! Your account is ready. Here are your login details:
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/40">EMAIL</p>
                <p className="mt-1 text-sm text-white">{result.email}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">TEMPORARY PASSWORD</p>
                <p className="mt-1 font-mono text-sm text-[#2DD4BF]">{result.password}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/40">
            Please save your password and sign in to access your dashboard.
          </p>

          <Link href="/login">
            <Button className="mt-6 h-12 w-full rounded-full bg-[#2DD4BF] text-base font-medium text-black hover:bg-[#5EEAD4]">
              Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-[-0.64px] text-white">Become an Influencer</h1>
          <p className="mt-4 text-base text-white/40">Join SokoLink and start earning commissions.</p>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <p className="text-sm text-red-400">{error}</p>
            {alreadyRegistered && (
              <Link href="/login">
                <Button className="mt-3 rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                  Go to Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-white/60">Full Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Your full name" />
            </div>
            <div>
              <Label className="text-sm text-white/60">Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="your@email.com" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-white/60">WhatsApp Number *</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="+263 7XX XXX XXX" />
            </div>
            <div>
              <Label className="text-sm text-white/60">City</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Harare, Bulawayo..." />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-white/60">Main Platform *</Label>
              <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v ?? "" })}>
                <SelectTrigger className="mt-1.5 border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#121216] text-white">
                  {["TikTok", "Instagram", "Facebook", "YouTube", "WhatsApp", "Multiple"].map((p) => (
                    <SelectItem key={p} value={p} className="focus:bg-white/5">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-white/60">Approximate Followers *</Label>
              <Select value={form.followerCount} onValueChange={(v) => setForm({ ...form, followerCount: v ?? "" })}>
                <SelectTrigger className="mt-1.5 border-white/10 bg-white/5 text-white">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#121216] text-white">
                  {["1K - 5K", "5K - 10K", "10K - 50K", "50K - 100K", "100K+"].map((r) => (
                    <SelectItem key={r} value={r} className="focus:bg-white/5">{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-sm text-white/60">Your Niche *</Label>
            <Input value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })}
              required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="e.g., fashion, tech, lifestyle" />
          </div>
          <div>
            <Label className="text-sm text-white/60">About you</Label>
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="What content do you create?" rows={4} />
          </div>
          <Button type="submit" disabled={sending}
            className="h-12 w-full rounded-full bg-[#2DD4BF] text-base font-medium text-black hover:bg-[#5EEAD4]">
            {sending ? "Submitting..." : "Submit Application"}
          </Button>
          <p className="text-center text-xs text-white/30">
            Already registered? <Link href="/login" className="text-[#2DD4BF] hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
