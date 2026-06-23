import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, Users, Warehouse, Globe, ArrowRight, Package, ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

async function getStats() {
  const supabase = await createClient()
  const { count: products } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "active")
  const { count: partners } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "influencer").eq("status", "active")
  return { products: products ?? 0, partners: partners ?? 0 }
}

export default async function Home() {
  const stats = await getStats()

  const statItems = [
    { label: "Products in Catalog", value: stats.products + "+", icon: Package },
    { label: "Active Partners", value: stats.partners + "+", icon: Users },
    { label: "Markets Served", value: "Southern Africa", icon: Globe },
    { label: "Local Warehouse", value: "Harare", icon: Warehouse },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-32 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-light leading-[1.07] tracking-[-0.96px] text-white sm:text-6xl">
              Source.{" "}
              <span className="text-gradient">Sell.</span>{" "}
              Scale.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              SokoLink connects Southern African resellers and creators with premium products
              from global suppliers. No middlemen, no hassle.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/products">
                <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
                  Browse Products
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline"
                  className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-base text-white/80 hover:bg-white/10">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#0a0a0e]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statItems.map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center">
                  <s.icon className="h-5 w-5 text-[#2DD4BF]/60" />
                </div>
                <div className="mt-2 text-3xl font-light tracking-tight text-[#2DD4BF]">
                  {typeof s.value === "number" ? s.value : s.value}
                </div>
                <div className="mt-1 text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Paths */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-[-0.64px] text-white">Choose Your Path</h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/40">
              Whether you run a shop or create content — we have a way for you to work with us.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Track A: Wholesale */}
            <div className="group rounded-2xl border border-white/5 bg-[#121216] p-8 transition-all hover:border-white/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                <Store className="h-7 w-7 text-[#2DD4BF]" />
              </div>
              <h3 className="mt-6 text-2xl font-light text-white">Wholesale Supply</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Buy products at wholesale prices. Order online, pay via EcoCash or bank transfer,
                and pick up from our Harare warehouse or request delivery.
              </p>
              <ul className="mt-6 space-y-3">
                {["Browse our full product catalog with wholesale pricing", "No minimum order — buy what you need", "Pay by EcoCash, bank transfer, or cash on pickup", "Same-day pickup or scheduled delivery"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2DD4BF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products">
                <Button className="mt-8 w-full rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Track B: Creator Partnership */}
            <div className="group rounded-2xl border border-white/5 bg-[#121216] p-8 transition-all hover:border-white/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                <Users className="h-7 w-7 text-[#2DD4BF]" />
              </div>
              <h3 className="mt-6 text-2xl font-light text-white">Creator Partnership</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                Have an audience? Partner with us to access quality products. Whether you want
                to become an affiliate, sign as a KOL, or collaborate — we find the right fit.
              </p>
              <ul className="mt-6 space-y-3">
                {["Access our product catalog for your content", "Choose your collaboration model — we're flexible", "Local warehouse means fast fulfillment for your customers", "Dedicated support via WhatsApp"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2DD4BF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply">
                <Button className="mt-8 w-full rounded-full border border-[#2DD4BF]/30 bg-transparent text-[#2DD4BF] hover:bg-[#2DD4BF]/10">
                  Apply to Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#121216] to-[#0a0a0e] px-8 py-20 text-center">
            <Warehouse className="mx-auto h-10 w-10 text-[#2DD4BF]" />
            <h2 className="mt-6 text-3xl font-light tracking-[-0.64px] text-white">
              Products in Stock, Ready to Go
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/40">
              Our Harare warehouse is stocked. Browse the catalog or reach out to discuss partnership opportunities.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/products">
                <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
                  View Catalog
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline"
                  className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-base text-white/80 hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
