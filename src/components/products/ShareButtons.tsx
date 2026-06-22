"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Camera } from "lucide-react"

interface Props {
  url: string
  text: string
  productName: string
}

export function ShareButtons({ url, text, productName }: Props) {
  const shareVia = (platform: string) => {
    const encoded = encodeURIComponent(text + "\n\n" + url)
    const link = platform === "whatsapp"
      ? `https://wa.me/?text=${encoded}`
      : `https://www.instagram.com/create/story/?hint=${encodeURIComponent(productName)}`
    window.open(link, "_blank", "noopener")
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-base font-medium text-white">Share This Product</h3>
      <p className="mt-1 text-sm text-white/40">Promote to your audience and earn</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => shareVia("whatsapp")}
          className="rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0 text-xs">
          <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> WhatsApp
        </Button>
        <Button size="sm" onClick={() => shareVia("instagram")}
          className="rounded-full bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border-0 text-xs">
          <Camera className="mr-1.5 h-3.5 w-3.5" /> Instagram
        </Button>
        <Button size="sm" onClick={() => navigator.clipboard.writeText(url)}
          className="rounded-full bg-white/10 text-white/80 hover:bg-white/20 border-0 text-xs">
          Copy Link
        </Button>
      </div>
    </div>
  )
}
