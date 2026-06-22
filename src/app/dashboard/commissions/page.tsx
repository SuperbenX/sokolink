"use client"

import { useState, useEffect } from "react"

export default function DashboardCommissions() {
  const [summary, setSummary] = useState({ total: 0, pending: 0, paid: 0 })

  useEffect(() => {
    // Dashboard commissions will be fetched via the orders API
    fetch("/api/orders").then(r => r.json()).then((orders: any[]) => {
      const total = orders.reduce((s, o) => s + Number(o.commission_amount), 0)
      const pending = orders.filter(o => o.status !== "delivered").reduce((s, o) => s + Number(o.commission_amount), 0)
      const paid = orders.filter(o => o.status === "delivered").reduce((s, o) => s + Number(o.commission_amount), 0)
      setSummary({ total, pending, paid })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Commissions</h1>
      <p className="mt-1 text-sm text-white/40">Track your earnings and payout history.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Total Earned", value: summary.total },
          { label: "Pending", value: summary.pending },
          { label: "Delivered (Paid)", value: summary.paid },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <p className="text-sm text-white/40">{s.label}</p>
            <p className="mt-2 text-3xl font-light text-white">${s.value.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/5 bg-[#121216] py-16 text-center">
        <p className="text-sm text-white/30">
          {summary.total > 0 ? "Commissions are paid after order delivery." : "Start promoting to earn commissions!"}
        </p>
      </div>
    </div>
  )
}
