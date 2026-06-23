import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-light tracking-[-0.64px] text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: June 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/60">
          <section>
            <h2 className="mb-3 text-lg font-medium text-white">1. Overview</h2>
            <p>SokoLink (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates as a wholesale supply and creator partnership platform connecting suppliers with resellers and content creators in Southern Africa. By accessing or using our website and services, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">2. Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">3. Orders &amp; Payments</h2>
            <p>All prices listed on our platform are in USD. Orders are confirmed upon receipt of payment. We accept bank transfers, EcoCash, and cash on pickup at our Harare warehouse. Payment must be received before goods are released for pickup or delivery.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">4. Pickup &amp; Delivery</h2>
            <p>Orders can be picked up from our warehouse in Harare or delivered within Zimbabwe for an additional fee. Delivery timelines are estimates and not guaranteed. Risk of loss transfers to you upon pickup or delivery.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">5. Returns &amp; Refunds</h2>
            <p>Defective or incorrect items may be returned within 7 days of receipt for replacement or refund. Items must be unused and in original packaging. We do not accept returns for change of mind due to the wholesale nature of our business.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">6. Partnership Program</h2>
            <p>Creator partnership terms are agreed upon individually with each partner. These terms may include commission structures, content requirements, and exclusivity clauses as mutually agreed in writing.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">7. Limitation of Liability</h2>
            <p>Our liability is limited to the purchase price of the products ordered. We are not liable for indirect damages, loss of profits, or business interruption arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">8. Changes</h2>
            <p>We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-medium text-white">9. Contact</h2>
            <p>Questions about these terms? Contact us via WhatsApp or email at <a href="mailto:superbenx0706@gmail.com" className="text-[#2DD4BF] hover:underline">superbenx0706@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
