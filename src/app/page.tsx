import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, Users, Globe } from "lucide-react"

const stats = [
  { label: "Products Available", value: "50+" },
  { label: "Active Influencers", value: "25+" },
  { label: "Commission Rates", value: "Up to 25%" },
  { label: "Markets Served", value: "Southern Africa" },
]

const steps = [
  {
    icon: Users,
    title: "Sign Up",
    description: "Apply as an influencer. Tell us about your audience and niche.",
  },
  {
    icon: Package,
    title: "Pick Products",
    description: "Browse our catalog and choose products that match your audience.",
  },
  {
    icon: TrendingUp,
    title: "Promote & Earn",
    description: "Share your unique link. Earn commissions on every sale.",
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-32 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-light leading-[1.07] tracking-[-0.96px] text-white sm:text-6xl">
              Connect.{" "}
              <span className="text-gradient">Create.</span>{" "}
              Earn.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              SokoLink bridges African influencers with premium global products.
              No supply chain hassle. No upfront cost. Just pick, promote, and profit.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/apply">
                <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
                  Become an Influencer
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-base text-white/80 hover:bg-white/10"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#0a0a0e]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-light tracking-tight text-[#2DD4BF]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-light tracking-[-0.64px] text-white">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-base text-white/40">
            Three simple steps to start earning
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group rounded-2xl border border-white/5 bg-[#121216] p-8 transition-colors hover:border-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                  <step.icon className="h-6 w-6 text-[#2DD4BF]" />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm font-medium text-[#2DD4BF]">0{i + 1}</span>
                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#121216] to-[#0a0a0e] px-8 py-20 text-center">
            <Globe className="mx-auto h-10 w-10 text-[#2DD4BF]" />
            <h2 className="mt-6 text-3xl font-light tracking-[-0.64px] text-white">
              Ready to Start Earning?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/40">
              Join the growing community of African influencers earning on their own terms.
            </p>
            <Link href="/apply">
              <Button className="mt-8 h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
                Apply Now &mdash; It&apos;s Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
