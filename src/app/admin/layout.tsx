import Link from "next/link"
import { LayoutDashboard, Package, Users, ShoppingCart, DollarSign, Box } from "lucide-react"

const sidebarLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/influencers", icon: Users, label: "Influencers" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/commissions", icon: DollarSign, label: "Commissions" },
  { href: "/admin/samples", icon: Box, label: "Samples" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-[#0a0a0e] p-6 lg:block">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-white">
            Soko<span className="text-[#2DD4BF]">Link</span>
          </span>
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-400">
            Admin
          </span>
        </div>
        <nav className="mt-8 space-y-1">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white/80">
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-6 lg:p-10">{children}</div>
    </div>
  )
}
