import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Box, User, LogOut } from "lucide-react"
import { SignOutButton } from "@/components/layout/SignOutButton"

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/products", icon: Package, label: "Products" },
  { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/dashboard/commissions", icon: DollarSign, label: "Commissions" },
  { href: "/dashboard/samples", icon: Box, label: "Samples" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-[#0a0a0e] p-6 lg:block">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-white">
            Soko<span className="text-[#2DD4BF]">Link</span>
          </span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/40">
            Influencer
          </span>
        </div>
        <nav className="mt-8 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-white/5 bg-[#0e0e12] px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              Soko<span className="text-[#2DD4BF]">Link</span>
            </span>
            <div className="flex gap-2">
              {sidebarLinks.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href}
                  className="rounded-lg px-3 py-2 text-xs text-white/40 hover:bg-white/5 hover:text-white/80">
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 lg:p-10">{children}</div>
      </div>
    </div>
  )
}
