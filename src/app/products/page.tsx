import { ProductGrid } from "@/components/products/ProductGrid"
import { getActiveProducts } from "@/lib/supabase/queries"

export default async function ProductsPage() {
  const products = await getActiveProducts()
  const categories = ["All", ...new Set(products.map((p) => p.category))]

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-[-0.64px] text-white">Products</h1>
          <p className="mt-4 text-base text-white/40">
            Browse our catalog at wholesale prices. All prices in USD.
          </p>
        </div>
        <ProductGrid products={products} categories={categories} />
      </div>
    </div>
  )
}
