"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button onClick={handleSignOut}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/30 transition-colors hover:text-white/60">
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  )
}
