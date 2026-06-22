import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react"

const stats = [
  { icon: DollarSign, label: "Total Earnings", value: "$0.00", sub: "Pending: $0.00" },
  { icon: ShoppingCart, label: "Orders", value: "0", sub: "This month" },
  { icon: TrendingUp, label: "Commission Rate", value: "15%", sub: "Average across products" },
  { icon: Package, label: "Active Products", value: "6", sub: "Available to promote" },
]

const recentOrders = [
  { id: "#1001", product: "Portable Power Station 500W", customer: "T. Moyo", amount: "$189.99", commission: "$22.80", status: "Pending" },
  { id: "#1002", product: "Wireless Bluetooth Earbuds Pro", customer: "S. Ndlovu", amount: "$39.99", commission: "$4.00", status: "Shipped" },
]

export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-2xl font-light text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/40">Welcome back! Here&apos;s your performance overview.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/5 bg-[#121216] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
              <stat.icon className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="mt-4 text-sm text-white/40">{stat.label}</p>
            <p className="mt-1 text-2xl font-light text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-white/30">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-medium text-white">Recent Orders</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
          {recentOrders.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  {["Order", "Product", "Customer", "Amount", "Commission", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-white/80">{order.id}</td>
                    <td className="px-5 py-3 text-white/80">{order.product}</td>
                    <td className="px-5 py-3 text-white/60">{order.customer}</td>
                    <td className="px-5 py-3 text-white/80">{order.amount}</td>
                    <td className="px-5 py-3 text-[#2DD4BF]">{order.commission}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/40">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-white/30">No orders yet. Start promoting products!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
