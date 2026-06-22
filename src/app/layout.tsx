import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ToastProvider from "@/components/layout/ToastProvider"
import WhatsAppButton from "@/components/layout/WhatsAppButton"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SokoLink — Connect. Create. Earn.",
  description:
    "SokoLink connects African influencers with premium products from global suppliers. Browse products, earn commissions, and grow your brand.",
  manifest: "/manifest.json",
  icons: {
    apple: "/images/icon-192.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0e0e12]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <ToastProvider />
        <WhatsAppButton />
      </body>
    </html>
  )
}
