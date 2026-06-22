"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/database"

interface ProductGridProps {
  products: Product[]
  categories: string[]
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <div className="mt-12">
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-5 py-2 text-sm transition-colors",
              activeCategory === cat
                ? "bg-[#2DD4BF] text-black font-medium"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group rounded-2xl border border-white/5 bg-[#121216] p-6 transition-all hover:border-white/10"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white/5">
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl text-white/10">
                  {product.category === "Power & Energy" ? "⚡" : product.category === "Fashion & Apparel" ? "👕" : "🎧"}
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="text-xs text-[#2DD4BF]">{product.category}</span>
              <h3 className="mt-1 text-lg font-medium text-white group-hover:text-[#2DD4BF] transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-white/40 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-medium text-white">
                  ${product.price_usd.toFixed(2)}
                </span>
                <span className="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs text-[#2DD4BF]">
                  {(product.commission_rate * 100).toFixed(0)}% commission
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
