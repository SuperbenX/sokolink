"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const statuses = ["pending", "approved", "shipped", "rejected"]

export default function AdminSamples() {
  const [requests, setRequests] = useState<any[]>([])

  const fetchRequests = () => {
    fetch("/api/admin/samples").then(r => r.json()).then(setRequests).catch(() => {})
  }

  useEffect(() => { fetchRequests() }, [])

  const updateStatus = async (requestId: string, status: string) => {
    const res = await fetch("/api/admin/samples", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId, status }),
    })
    if (res.ok) {
      toast.success(`Request ${status}`)
      fetchRequests()
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Sample Requests</h1>
      <p className="mt-1 text-sm text-white/40">Review influencer sample requests.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {requests.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Influencer", "Product", "Status", "Address", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 text-white/80">{(r.profiles as any)?.name || "—"}</td>
                  <td className="px-5 py-3 text-white/80">{(r.products as any)?.name || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40 capitalize">{r.status}</span>
                  </td>
                  <td className="px-5 py-3 text-white/40 text-xs max-w-[200px] truncate">{r.shipping_address || "—"}</td>
                  <td className="px-5 py-3">
                    <select onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white">
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
            <p className="text-sm text-white/30">No sample requests yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
