import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { getProductById } from "@/lib/supabase/queries"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="text-2xl text-white">Product not found</h1>
        <Link href="/products"><Button variant="outline" className="mt-4">Back to Products</Button></Link>
      </div>
    )
  }

  const waUrl = `https://wa.me/8613316895078?text=${encodeURIComponent(`Hi SokoLink! I'm interested in ${product.name} (${product.category}). Please send me pricing and availability.`)}`

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/80">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
              <div className="flex h-full items-center justify-center">
                <span className="text-6xl text-white/10">
                  {product.category === "Power & Energy" ? "⚡" : product.category === "Fashion & Apparel" ? "👕" : "🎧"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm text-[#2DD4BF]">{product.category}</span>
            <h1 className="mt-2 text-3xl font-light tracking-[-0.64px] text-white">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">{product.description}</p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/40">Pricing &amp; Availability</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Contact us via WhatsApp for wholesale pricing, bulk discounts, and stock availability.
              </p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-4 w-full rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] h-12 text-base">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>

            <div className="mt-6 text-sm text-white/30 space-y-2">
              <p>• Wholesale pricing for resellers &amp; creators</p>
              <p>• Bulk discounts available</p>
              <p>• Pickup from Harare warehouse or delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
