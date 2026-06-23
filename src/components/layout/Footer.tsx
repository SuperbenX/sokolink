import Link from "next/link"

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  "Partnerships": [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/apply", label: "Apply to Partner" },
    { href: "/products", label: "Browse Products" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  Support: [
    { href: "/contact", label: "Help Center" },
    { href: "/contact", label: "WhatsApp Support" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0e]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight text-white">
              Soko<span className="text-[#2DD4BF]">Link</span>
            </Link>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              Connecting Southern Africa with premium global products. Wholesale & partnership.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-medium text-white/60">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} SokoLink. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
