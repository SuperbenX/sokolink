import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Package, TrendingUp, DollarSign } from "lucide-react"

const steps = [
  {
    icon: Users,
    title: "1. Apply & Get Approved",
    description: "Fill out our simple application form. Tell us about your niche, audience size, and platforms. Most applications are reviewed within 24 hours.",
  },
  {
    icon: Package,
    title: "2. Browse & Select Products",
    description: "Access our curated catalog of premium products. Each product shows you the exact commission you'll earn. Request samples for products you want to promote.",
  },
  {
    icon: TrendingUp,
    title: "3. Promote Your Way",
    description: "Share your unique referral links on TikTok, Instagram, Facebook, or WhatsApp. Create content that resonates with your audience.",
  },
  {
    icon: DollarSign,
    title: "4. Earn Commissions",
    description: "Earn 10-25% commission on every sale through your links. Track your earnings in real-time through your dashboard. Get paid out regularly.",
  },
]

const faqs = [
  { q: "Who can join?", a: "Anyone with a social media presence in Southern Africa. Whether you have 1,000 or 100,000 followers, you can earn." },
  { q: "How much can I earn?", a: "Commissions range from 10-25% per sale. An influencer selling 50 items at $30 with 15% commission earns $225." },
  { q: "How do I get paid?", a: "Payouts are processed via mobile money (EcoCash), bank transfer, or WhatsApp-based payments." },
  { q: "Do I need to handle shipping?", a: "No. We handle all inventory, packaging, and delivery. You just promote." },
  { q: "Can I request samples?", a: "Yes! Active influencers can request product samples to review before promoting." },
]

export default function HowItWorksPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-light tracking-[-0.64px] text-white">How It Works</h1>
        <p className="mt-4 text-base text-white/40">Your path to earning commissions on your terms</p>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <div className="space-y-16">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                <step.icon className="h-6 w-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-2xl font-light text-white text-center">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
              <h3 className="text-base font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/apply">
          <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
