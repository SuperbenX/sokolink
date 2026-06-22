import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SampleRequestForm } from "@/components/products/SampleRequestForm"
import { CommissionCalculator } from "@/components/products/CommissionCalculator"
import { ShareButtons } from "@/components/products/ShareButtons"
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

  const shareUrl = `https://sokolink.vercel.app/products/${product.id}`
  const shareText = `Check out ${product.name} on SokoLink! Earn ${(product.commission_rate * 100).toFixed(0)}% commission promoting this product.`

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
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-light text-white">${Number(product.price_usd).toFixed(2)}</span>
              <span className="rounded-full bg-[#2DD4BF]/10 px-4 py-1.5 text-sm text-[#2DD4BF]">
                {(product.commission_rate * 100).toFixed(0)}% commission
              </span>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white/40">Stock: {product.stock} units</p>
            </div>

            <div className="mt-8 space-y-6">
              <CommissionCalculator priceUsd={Number(product.price_usd)} commissionRate={product.commission_rate} />
              <ShareButtons url={shareUrl} text={shareText} productName={product.name} />
              <SampleRequestForm productId={product.id} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
