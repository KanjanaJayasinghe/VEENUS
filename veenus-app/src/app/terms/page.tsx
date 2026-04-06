import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Veenus Kleding – Read the terms and conditions governing the use of our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 0.04 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(var(--image-overlay), 0.98), rgba(var(--image-overlay-section), 0.96))' }} />

      <div className="relative container-luxury py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-gold-300 mb-4 tracking-wider uppercase text-center">Terms of Service</h1>
          <p className="text-luxury-cream/40 text-sm text-center mb-12">Last updated: April 6, 2026</p>

          <div className="space-y-8 text-luxury-cream/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Veenus Kleding website (<strong>veenuskleding.com</strong>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">2. Use of Our Services</h2>
              <p className="mb-3">When using our website, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Provide accurate and complete information when creating an account or placing an order.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Use the website only for lawful purposes.</li>
                <li>Not engage in any activity that could harm, disable, or impair the website.</li>
                <li>Not attempt to gain unauthorized access to any part of our systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">3. Accounts</h2>
              <p>
                You may create an account using your email address and password, or by signing in with Google. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">4. Products and Orders</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>All product descriptions, images, and prices are provided as accurately as possible, but we do not guarantee they are error-free.</li>
                <li>We reserve the right to refuse or cancel any order for any reason, including product availability or pricing errors.</li>
                <li>Colors and appearance of products may vary slightly from images shown on the website.</li>
                <li>Prices are subject to change without notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">5. Payment</h2>
              <p>
                By placing an order, you agree to pay the total amount shown at checkout, including applicable taxes and shipping fees. All payments must be made through the accepted payment methods available on our website.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">6. Shipping and Delivery</h2>
              <p>
                We aim to process and ship orders promptly. Delivery times may vary depending on your location and other factors. We are not responsible for delays caused by shipping carriers or circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">7. Returns and Refunds</h2>
              <p>
                Returns and refunds are subject to our return policy. Items must be in their original condition and returned within the applicable return period. Please contact us for return instructions.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">8. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Veenus Kleding or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our written consent.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">9. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Veenus Kleding shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, including but not limited to loss of profits, data, or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Veenus Kleding, its affiliates, and their respective officers, directors, and employees from any claims, damages, or expenses arising from your violation of these Terms or your use of our website.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">11. Modifications</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">13. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 p-4 border border-gold-800/20 bg-gold-900/5 rounded">
                <p><strong>Veenus Kleding</strong></p>
                <p>Email: veenuskleding@gmail.com</p>
                <p>Website: veenuskleding.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
