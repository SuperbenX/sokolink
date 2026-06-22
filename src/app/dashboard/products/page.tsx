"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Copy } from "lucide-react"
import { toast } from "sonner"

interface Product {
  id: string; name: string; description: string; category: string
  price_usd: number; commission_rate: number; stock: number
}

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts).catch(() => {})
  }, [])

  const copyLink = (p: Product) => {
    const url = `https://sokolink-x.vercel.app/products/${p.id}`
    const text = `💰 Earn ${(p.commission_rate * 100).toFixed(0)}% commission promoting ${p.name}! Check it out: ${url}`
    navigator.clipboard.writeText(text)
    toast.success("Promo text copied! Share on your socials.")
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-white">Products to Promote</h1>
      <p className="mt-1 text-sm text-white/40">Browse products and share your referral link.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <span className="text-xs text-[#2DD4BF]">{p.category}</span>
            <h3 className="mt-1 text-base font-medium text-white">{p.name}</h3>
            <p className="mt-2 text-sm text-white/40 line-clamp-2">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-light text-white">${Number(p.price_usd).toFixed(2)}</span>
              <span className="text-sm text-[#2DD4BF]">{(p.commission_rate * 100).toFixed(0)}%</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/products/${p.id}`} className="flex-1">
                <Button variant="outline" size="sm"
                  className="w-full border-white/10 text-white/60 hover:bg-white/5">
                  <ExternalLink className="mr-2 h-3 w-3" /> View
                </Button>
              </Link>
              <Button size="sm" onClick={() => copyLink(p)}
                className="bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-sm text-white/30">No products available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
