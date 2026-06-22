import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
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

  const wholesale = product.wholesale_price || product.price_usd
  const shareUrl = `https://sokolink-x.vercel.app/products/${product.id}`
  const shareText = `Check out ${product.name} on SokoLink! Wholesale from $${wholesale.toFixed(2)}.`

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
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-white/40">WHOLESALE PRICE</p>
                  <p className="mt-1 text-3xl font-light text-[#2DD4BF]">${wholesale.toFixed(2)}</p>
                </div>
                {product.wholesale_price && (
                  <div className="text-right">
                    <p className="text-xs text-white/40">RETAIL PRICE</p>
                    <p className="mt-1 text-lg text-white/40 line-through">${Number(product.price_usd).toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm text-white/30">
                Wholesale pricing for resellers. Contact us via WhatsApp to place an order or visit our warehouse for pickup.
              </p>
              <ShareButtons url={shareUrl} text={shareText} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
