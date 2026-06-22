import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const products = [
  { id: "1", name: "Portable Power Station 500W", price: 189.99, commission: 12, category: "Power" },
  { id: "2", name: "LED Rechargeable Camping Lantern", price: 24.99, commission: 15, category: "Power" },
  { id: "3", name: "Premium Sportswear Set", price: 45.99, commission: 15, category: "Fashion" },
  { id: "4", name: "Wireless Bluetooth Earbuds Pro", price: 39.99, commission: 10, category: "Electronics" },
  { id: "5", name: "Solar LED Flood Light 200W", price: 59.99, commission: 12, category: "Power" },
  { id: "6", name: "Casual Streetwear Hoodie", price: 34.99, commission: 18, category: "Fashion" },
]

export default function DashboardProducts() {
  return (
    <div>
      <h1 className="text-2xl font-light text-white">Products to Promote</h1>
      <p className="mt-1 text-sm text-white/40">Browse products and share your referral link.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <span className="text-xs text-[#2DD4BF]">{p.category}</span>
            <h3 className="mt-1 text-base font-medium text-white">{p.name}</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-light text-white">${p.price.toFixed(2)}</span>
              <span className="text-sm text-[#2DD4BF]">{p.commission}%</span>
            </div>
            <Link href={`/products/${p.id}`}>
              <Button variant="outline" size="sm" className="mt-4 w-full border-white/10 text-white/60 hover:bg-white/5">
                <ExternalLink className="mr-2 h-3 w-3" /> View Product
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
