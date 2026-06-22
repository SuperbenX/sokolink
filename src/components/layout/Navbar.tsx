"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/leaderboard", label: "Top Earners" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-white">
            Soko<span className="text-[#2DD4BF]">Link</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white/90">
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 px-5 text-sm border-0">
                  Dashboard
                </Button>
              </Link>
              <button onClick={handleSignOut}
                className="text-xs text-white/40 hover:text-white/70 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-sm text-white/60 hover:text-white/90">
                  Sign In
                </Button>
              </Link>
              <Link href="/apply">
                <Button className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] px-6 text-sm font-medium">
                  Join as Influencer
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <span className="inline-flex items-center justify-center rounded-md p-2 text-white/60 hover:bg-white/5">
              <Menu className="h-5 w-5" />
            </span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/5 bg-[#0e0e12] p-6">
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="text-lg text-white/60 transition-colors hover:text-white/90">
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-full bg-white/10 text-white hover:bg-white/20">Dashboard</Button>
                  </Link>
                  <button onClick={() => { handleSignOut(); setOpen(false); }}
                    className="text-left text-lg text-white/40 hover:text-white/70">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}
                    className="text-lg text-white/60 hover:text-white/90">Sign In</Link>
                  <Link href="/apply" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4]">
                      Join as Influencer
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
