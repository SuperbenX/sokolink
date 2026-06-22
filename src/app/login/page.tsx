"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message === "Invalid login credentials"
        ? "Invalid email or password."
        : signInError.message)
      setLoading(false)
      return
    }

    // Redirect admin users to /admin, influencers to /dashboard
    const supabase2 = createClient()
    const { data: profile } = await supabase2
      .from("profiles")
      .select("role")
      .eq("id", (await supabase.auth.getUser()).data.user?.id)
      .single()

    router.push(profile?.role === "admin" ? "/admin" : "/dashboard")
    router.refresh()
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-[-0.64px] text-white">Sign In</h1>
          <p className="mt-2 text-sm text-white/40">Access your influencer dashboard</p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <Label className="text-sm text-white/60">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="your@email.com" />
          </div>
          <div>
            <Label className="text-sm text-white/60">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Your password" />
          </div>
          <Button type="submit" disabled={loading}
            className="h-12 w-full rounded-full bg-[#2DD4BF] text-base font-medium text-black hover:bg-[#5EEAD4]">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-white/30">
          Not registered?{" "}
          <Link href="/apply" className="text-[#2DD4BF] hover:underline">Apply as influencer</Link>
        </p>
      </div>
    </div>
  )
}
