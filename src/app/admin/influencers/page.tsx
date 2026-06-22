"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminInfluencers() {
  const [influencers, setInfluencers] = useState<any[]>([])

  const fetchInfluencers = () => {
    fetch("/api/admin/influencers").then(r => r.json()).then(setInfluencers).catch(() => {})
  }

  useEffect(() => { fetchInfluencers() }, [])

  const updateStatus = async (profileId: string, status: string) => {
    const res = await fetch("/api/admin/influencers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile_id: profileId, status }),
    })
    const data = await res.json()
    if (data.success) {
      toast.success(`Status updated to ${status}`)
      fetchInfluencers()
    } else {
      toast.error(data.error || "Error")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Influencers</h1>
      <p className="mt-1 text-sm text-white/40">{influencers.length} registered influencers</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {influencers.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Name", "Email", "Phone", "Followers", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {influencers.map((inf) => (
                <tr key={inf.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 text-white/80">{inf.name}</td>
                  <td className="px-5 py-3 text-white/60">{inf.email}</td>
                  <td className="px-5 py-3 text-white/60">{inf.phone || "—"}</td>
                  <td className="px-5 py-3 text-white/80">{inf.follower_count || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs ${
                      inf.status === "active" ? "bg-[#2DD4BF]/20 text-[#2DD4BF]" : "text-white/40 border border-white/10"
                    }`}>{inf.status}</span>
                  </td>
                  <td className="px-5 py-3 space-x-2">
                    {inf.status === "pending" && (
                      <Button size="sm" onClick={() => updateStatus(inf.id, "active")}
                        className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] text-xs h-7 px-3">
                        Approve
                      </Button>
                    )}
                    {inf.status === "active" && (
                      <Button size="sm" onClick={() => updateStatus(inf.id, "suspended")}
                        className="rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs h-7 px-3 border-0">
                        Suspend
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-white/30">No influencers yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
