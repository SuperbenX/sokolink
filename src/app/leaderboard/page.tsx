import { createClient } from "@/lib/supabase/server"
import { Trophy, Medal } from "lucide-react"

async function getLeaderboard() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("commissions")
    .select("influencer_id, amount, profiles!influencer_id(name)")
    .eq("status", "paid")
  if (!data) return []
  const map: Record<string, { name: string; total: number }> = {}
  for (const row of data) {
    const name = (row.profiles as any)?.name || "Unknown"
    if (!map[row.influencer_id]) map[row.influencer_id] = { name, total: 0 }
    map[row.influencer_id].total += Number(row.amount)
  }
  return Object.values(map).sort((a, b) => b.total - a.total).slice(0, 20)
}

const icons = [<Trophy key="1" className="h-5 w-5 text-yellow-400" />, <Medal key="2" className="h-5 w-5 text-gray-300" />, <Medal key="3" className="h-5 w-5 text-amber-600" />]

export default async function LeaderboardPage() {
  const leaders = await getLeaderboard()

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Trophy className="mx-auto h-10 w-10 text-[#2DD4BF]" />
        <h1 className="mt-4 text-4xl font-light tracking-[-0.64px] text-white">Top Earners</h1>
        <p className="mt-4 text-base text-white/40">Our highest-earning influencers.</p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl">
        {leaders.length > 0 ? (
          <div className="space-y-3">
            {leaders.map((l, i) => (
              <div key={l.name} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#121216] p-5">
                <div className="flex h-10 w-10 items-center justify-center">
                  {i < 3 ? icons[i] : <span className="text-sm text-white/30">#{i + 1}</span>}
                </div>
                <div className="flex-1"><p className="text-base font-medium text-white">{l.name}</p></div>
                <p className="text-lg font-light text-[#2DD4BF]">${l.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-[#121216] py-20 text-center">
            <p className="text-sm text-white/30">No payouts yet. Be the first to earn!</p>
          </div>
        )}
      </div>
    </div>
  )
}
