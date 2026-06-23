import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-light tracking-[-0.64px] text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/60">
          <section>
            <h2 className="mb-3 text-lg font-medium text-white">1. Information We Collect</h2>
            <p>We collect information you provide when creating an account or placing an order: name, email address, phone number, WhatsApp contact, social media handles, shipping address, and payment details. We also collect usage data including pages viewed and actions taken on our platform.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">2. How We Use Your Information</h2>
            <p>We use your information to process orders, communicate about your account and orders, improve our platform, and send relevant updates about products and services. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">3. Data Storage &amp; Security</h2>
            <p>Your data is stored securely using industry-standard encryption. We use Supabase for database and authentication services. While we take reasonable measures to protect your data, no online service is 100% secure.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">4. Third-Party Services</h2>
            <p>We use the following third-party services that process your data: Supabase (database &amp; authentication), Vercel (hosting), and GitHub (code repository). Each service operates under its own privacy policy.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">5. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time. Contact us to exercise these rights. Account deletion may affect your ability to use our services.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">6. Cookies</h2>
            <p>We use essential cookies for authentication and platform functionality. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">7. Changes</h2>
            <p>We may update this policy as our services evolve. Registered users will be notified of material changes via email or platform notice.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">8. Contact</h2>
            <p>For privacy-related inquiries: <a href="mailto:superbenx0706@gmail.com" className="text-[#2DD4BF] hover:underline">superbenx0706@gmail.com</a> or via WhatsApp.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
