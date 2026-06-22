"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Box, User, Settings, Shield, Users, ClipboardList } from "lucide-react"
import { SignOutButton } from "@/components/layout/SignOutButton"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(d => {
      if (d && !d.error) {
        setRole(d.role)
        setName(d.name)
      }
    }).catch(() => {})
  }, [])

  const isAdmin = role === "admin"

  const influencerLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/products", icon: Package, label: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/dashboard/commissions", icon: DollarSign, label: "Commissions" },
    { href: "/dashboard/samples", icon: Box, label: "Samples" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
  ]

  const adminLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/influencers", icon: Users, label: "Influencers" },
    { href: "/admin/orders", icon: ClipboardList, label: "Orders" },
    { href: "/admin/commissions", icon: DollarSign, label: "Commissions" },
    { href: "/admin/samples", icon: Box, label: "Samples" },
  ]

  const links = isAdmin ? adminLinks : influencerLinks
  const badge = isAdmin ? "Admin" : "Influencer"

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-[#0a0a0e] p-6 lg:block">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-white">
            Soko<span className="text-[#2DD4BF]">Link</span>
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] border ${
            isAdmin ? "border-[#2DD4BF]/30 text-[#2DD4BF]" : "border-white/10 text-white/40"
          }`}>
            {badge}
          </span>
        </div>

        {name && (
          <p className="mt-3 text-xs text-white/30 truncate">{name}</p>
        )}

        <div className="mt-6 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white/80">
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}

          {!isAdmin && (
            <div className="pt-4 mt-4 border-t border-white/5">
              <p className="px-3 text-[10px] text-white/20 uppercase tracking-wider">Admin</p>
              <Link href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/30 transition-colors hover:bg-white/5 hover:text-white/60 mt-2">
                <Settings className="h-4 w-4" />
                Admin Panel
              </Link>
            </div>
          )}
        </div>

        <div className="mt-auto pt-8">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-white/5 bg-[#0e0e12] px-6 py-4 lg:hidden">
          <span className="text-sm font-semibold text-white">
            Soko<span className="text-[#2DD4BF]">Link</span>
          </span>
        </div>
        <div className="flex-1 p-6 lg:p-10">{children}</div>
      </div>
    </div>
  )
}
