"use client"

import { useState } from "react"

interface Props {
  priceUsd: number
  commissionRate: number
}

export function CommissionCalculator({ priceUsd, commissionRate }: Props) {
  const [sales, setSales] = useState("50")
  const monthly = Number(sales) * priceUsd * commissionRate

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-base font-medium text-white">Commission Calculator</h3>
      <p className="mt-1 text-sm text-white/40">Estimate your monthly earnings</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs text-white/60">Estimated monthly sales</label>
          <input type="range" min="10" max="500" value={sales}
            onChange={(e) => setSales(e.target.value)}
            className="mt-2 w-full accent-[#2DD4BF]" />
          <div className="mt-1 flex justify-between text-xs text-white/30">
            <span>10</span>
            <span className="text-white/80 font-medium">{sales}</span>
            <span>500</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">You could earn</p>
          <p className="text-2xl font-light text-[#2DD4BF]">${monthly.toFixed(2)}</p>
          <p className="text-xs text-white/40">/month</p>
        </div>
      </div>
    </div>
  )
}
