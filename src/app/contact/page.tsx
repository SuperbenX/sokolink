"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { MessageCircle, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! We'll get back to you soon.")
    setSending(false)
  }

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-light tracking-[-0.64px] text-white">Contact Us</h1>
          <p className="mt-4 text-base text-white/40">Have questions? We&apos;re here to help.</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                  <MessageCircle className="h-5 w-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">WhatsApp</h3>
                  <p className="mt-1 text-sm text-white/40">
                    <a href="https://wa.me/8613316895078" target="_blank" rel="noopener noreferrer"
                      className="text-[#2DD4BF] hover:underline">+86 133 1689 5078</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                  <Mail className="h-5 w-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Email</h3>
                  <p className="mt-1 text-sm text-white/40">
                    <a href="mailto:superbenx0706@gmail.com" className="text-[#2DD4BF] hover:underline">superbenx0706@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2DD4BF]/10">
                  <MapPin className="h-5 w-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Operations</h3>
                  <p className="mt-1 text-sm text-white/40">Harare, Zimbabwe<br />Guangzhou, China</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm text-white/60">Name *</Label>
                <Input id="name" required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm text-white/60">Email *</Label>
                <Input id="email" type="email" required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="msg" className="text-sm text-white/60">Message *</Label>
                <Textarea id="msg" required className="mt-1.5 border-white/10 bg-white/5 text-white" placeholder="How can we help?" rows={5} />
              </div>
              <Button type="submit" disabled={sending}
                className="rounded-full bg-[#2DD4BF] text-black hover:bg-[#5EEAD4] w-full">
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
