import { createServiceClient } from "@/lib/supabase/service"

export default async function AdminCommissions() {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("commissions")
    .select("*, orders!inner(products!inner(name)), profiles!influencer_id(name)")
    .order("created_at", { ascending: false })

  const totalPaid = (data || []).filter((c: any) => c.status === "paid")
    .reduce((s, c: any) => s + Number(c.amount), 0)

  const totalPending = (data || []).filter((c: any) => c.status === "pending")
    .reduce((s, c: any) => s + Number(c.amount), 0)

  return (
    <div>
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-light text-white">Commissions</h1>
          <p className="mt-1 text-sm text-white/40">Track and manage influencer payouts.</p>
        </div>
        <div className="flex gap-4 ml-auto">
          <div className="rounded-xl border border-white/5 bg-[#121216] px-4 py-3">
            <p className="text-xs text-white/40">Paid</p>
            <p className="text-lg font-light text-[#2DD4BF]">${totalPaid.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#121216] px-4 py-3">
            <p className="text-xs text-white/40">Pending</p>
            <p className="text-lg font-light text-yellow-400">${totalPending.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        {data && data.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                {["Influencer", "Product", "Amount", "Status", "Date"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data as any[]).map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 text-white/80">{c.profiles?.name || "—"}</td>
                  <td className="px-5 py-3 text-white/60">{(c.orders as any)?.products?.name || "—"}</td>
                  <td className="px-5 py-3 text-white/80">${Number(c.amount).toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs border ${
                      c.status === "paid"
                        ? "border-green-500/30 text-green-400"
                        : "border-yellow-500/30 text-yellow-400"
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3 text-white/40 text-xs">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-white/30">No commissions to display.</p>
          </div>
        )}
      </div>
    </div>
  )
}
