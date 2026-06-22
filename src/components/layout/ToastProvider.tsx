"use client"

import { Toaster } from "@/components/ui/sonner"

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#121216",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.9)",
        },
      }}
    />
  )
}
