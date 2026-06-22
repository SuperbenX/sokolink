import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Warehouse, Ship, HeadphonesIcon } from "lucide-react"

const advantages = [
  {
    icon: Warehouse,
    title: "Local Warehousing",
    description: "Products are stocked in our Zimbabwe warehouse. Fast delivery, no international shipping delays for your customers.",
  },
  {
    icon: Ship,
    title: "Direct Sourcing",
    description: "We source directly from Chinese manufacturers. Better quality control, better pricing, better commissions for you.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product is vetted before entering our catalog. We stand behind what you promote.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "WhatsApp-based support team. We help with content ideas, product info, and order issues.",
  },
]

export default function AboutPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-light tracking-[-0.64px] text-white">About SokoLink</h1>
        <p className="mt-4 text-base leading-relaxed text-white/60">
          SokoLink was built to solve a simple problem: African creators have the audience,
          Chinese suppliers have the products — but there was no bridge between them.
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/60">
          We are that bridge. Headquartered in China with operations in Zimbabwe, we handle
          everything from sourcing and quality control to warehousing and logistics. You focus
          on what you do best: creating content and connecting with your audience.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-2">
          {advantages.map((adv) => (
            <div key={adv.title} className="rounded-2xl border border-white/5 bg-[#121216] p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                <adv.icon className="h-5 w-5 text-[#2DD4BF]" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{adv.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link href="/apply">
          <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
            Join SokoLink
          </Button>
        </Link>
      </div>
    </div>
  )
}
