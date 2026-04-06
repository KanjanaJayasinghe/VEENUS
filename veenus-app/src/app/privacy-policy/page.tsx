import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Veenus Kleding – Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 0.04 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(var(--image-overlay), 0.98), rgba(var(--image-overlay-section), 0.96))' }} />

      <div className="relative container-luxury py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-gold-300 mb-4 tracking-wider uppercase text-center">Privacy Policy</h1>
          <p className="text-luxury-cream/40 text-sm text-center mb-12">Last updated: April 6, 2026</p>

          <div className="space-y-8 text-luxury-cream/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">1. Introduction</h2>
              <p>
                Welcome to Veenus Kleding (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>veenuskleding.com</strong> and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing information when you create an account or place an order.</li>
                <li><strong>Account Information:</strong> When you sign in using Google or create an account with email and password, we collect your name and email address.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and browsing patterns.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Process and fulfill your orders.</li>
                <li>Create and manage your account.</li>
                <li>Communicate with you about your orders, promotions, and updates.</li>
                <li>Improve our website, products, and services.</li>
                <li>Ensure the security and integrity of our platform.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">4. Third-Party Services</h2>
              <p className="mb-3">We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Google Firebase:</strong> For authentication (Google Sign-In, email/password login), database, and analytics.</li>
                <li><strong>Google Analytics:</strong> To analyze website traffic and usage patterns.</li>
              </ul>
              <p className="mt-3">These services may collect information in accordance with their own privacy policies. We encourage you to review their policies.</p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">6. Cookies</h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">7. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your personal data.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Object to or restrict processing of your data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-gold-400 font-display text-lg mb-3 tracking-wide">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
