"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Store, Users, ShoppingCart, CreditCard, Warehouse, Search, Handshake, Package, BarChart3 } from "lucide-react"

const tabs = [
  { id: "wholesale", label: "Wholesale", icon: Store },
  { id: "partnership", label: "Creator Partnership", icon: Users },
]

const wholesaleSteps = [
  { icon: Search, title: "1. Browse Catalog", desc: "Explore our product catalog with wholesale prices. Use categories to find what fits your market." },
  { icon: ShoppingCart, title: "2. Place an Order", desc: "Select products and quantities. No minimum order — buy what you need, when you need it." },
  { icon: CreditCard, title: "3. Pay via Bank / EcoCash", desc: "We'll confirm your order and provide payment details. Pay via bank transfer, EcoCash, or cash on pickup." },
  { icon: Warehouse, title: "4. Pickup or Delivery", desc: "Pick up from our Harare warehouse or arrange delivery. Same-day pickup available for in-stock items." },
]

const partnershipSteps = [
  { icon: Users, title: "1. Apply to Partner", desc: "Fill out a simple application. Tell us about your platform, audience, and what kind of collaboration interests you." },
  { icon: Handshake, title: "2. We Discuss the Terms", desc: "Whether you want affiliate commissions, a signed KOL contract, or another arrangement — we find a model that works for both sides." },
  { icon: Package, title: "3. Access Products", desc: "Get access to our product catalog. Request samples, create content, and start selling or promoting." },
  { icon: BarChart3, title: "4. Grow Together", desc: "We provide ongoing support, product updates, and flexible terms as your audience and sales grow." },
]

const wholesaleFaqs = [
  { q: "What are your wholesale prices?", a: "Wholesale prices are listed on each product page. Contact us for bulk discounts on large orders." },
  { q: "What payment methods do you accept?", a: "Bank transfer, EcoCash, and cash on pickup at our Harare warehouse." },
  { q: "Is there a minimum order?", a: "No minimum order. Buy as little or as much as you need." },
  { q: "Can I pick up from the warehouse?", a: "Yes. Our Harare warehouse is open for same-day pickup on in-stock items." },
  { q: "Do you deliver?", a: "Yes, we can arrange delivery within Harare and surrounding areas. Contact us for delivery fees." },
]

const partnershipFaqs = [
  { q: "Who can apply?", a: "Anyone with a social media presence in Southern Africa — TikTok, Instagram, Facebook, or WhatsApp. Followers of any size welcome." },
  { q: "What kind of partnership models do you offer?", a: "We're flexible. Affiliate commissions, signed KOL agreements, product collaborations — let's discuss what works for you." },
  { q: "Do I need to handle shipping?", a: "That depends on the model we agree on. For commission-based partnerships, we can handle fulfillment." },
  { q: "Can I request samples?", a: "Yes. Active partners can request product samples to review and create content." },
]

export default function HowItWorksPage() {
  const [tab, setTab] = useState("wholesale")

  const steps = tab === "wholesale" ? wholesaleSteps : partnershipSteps
  const faqs = tab === "wholesale" ? wholesaleFaqs : partnershipFaqs

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-light tracking-[-0.64px] text-white">How It Works</h1>
        <p className="mt-4 text-base text-white/40">
          Two ways to work with SokoLink — choose the path that fits your business.
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-12 flex max-w-md justify-center rounded-2xl border border-white/5 bg-[#121216] p-1.5">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all",
              tab === t.id
                ? "bg-[#2DD4BF] text-black"
                : "text-white/40 hover:text-white/80",
            )}>
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                <step.icon className="h-6 w-6 text-[#2DD4BF]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/60">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        {tab === "wholesale" ? (
          <Link href="/products">
            <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
              Browse Products
            </Button>
          </Link>
        ) : (
          <Link href="/apply">
            <Button className="h-12 rounded-full bg-[#2DD4BF] px-8 text-base font-medium text-black hover:bg-[#5EEAD4]">
              Apply to Partner
            </Button>
          </Link>
        )}
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-2xl font-light text-white">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
              <h3 className="text-base font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/40">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
