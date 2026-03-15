import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  shop: [
    { name: 'All Collections', href: '/collections' },
    { name: 'Dresses', href: '/categories/dresses' },
    { name: 'Suits', href: '/categories/suits' },
    { name: 'Outerwear', href: '/categories/outerwear' },
    { name: 'Accessories', href: '/categories/accessories' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Size Guide', href: '#' },
    { name: 'Care Instructions', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.124-5.864 10.124-11.854z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 0.06 }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.98), rgba(var(--image-overlay-section), 0.95), rgba(var(--image-overlay-section), 0.93))` }} />

      {/* Top gold ornamental border */}
      <div className="relative">
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #3D2E06, #5C4305, #B8860B, #D4AF37, #B8860B, #5C4305, #3D2E06, transparent)' }} />
        <div className="h-[1px] w-full mt-[1px]" style={{ background: 'linear-gradient(90deg, transparent 20%, rgba(184,134,11,0.15), transparent 80%)' }} />
      </div>

      <div className="relative container-luxury">
        {/* Main Footer */}
        <div className="py-12 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-8 group">
                <Image
                  src="/logo.png"
                  alt="Veenus Kleding"
                  width={200}
                  height={60}
                  className="h-14 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(184,134,11,0.5)]"
                />
              </Link>
              <p className="text-luxury-cream/50 text-sm leading-[1.8] max-w-md mb-10 font-light">
                Veenus Kleding embodies the essence of luxury fashion. Each piece is meticulously
                crafted to help you wear your confidence like an angel. Experience the finest
                materials and timeless designs that transcend seasons.
              </p>
              <div className="flex items-center gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-gold-600 hover:text-gold-300 transition-all duration-500 border border-gold-800/30 hover:border-gold-500/60 hover:shadow-[0_0_20px_rgba(184,134,11,0.25)] hover:bg-gold-900/20"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-gold-300 font-display text-lg mb-8 tracking-[0.15em] uppercase">Shop</h3>
              <div className="w-8 h-[1px] bg-gradient-to-r from-gold-600 to-transparent mb-6" />
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-luxury-cream/40 hover:text-gold-300 transition-all duration-300 text-sm tracking-wide hover:tracking-wider hover:pl-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-gold-300 font-display text-lg mb-8 tracking-[0.15em] uppercase">Company</h3>
              <div className="w-8 h-[1px] bg-gradient-to-r from-gold-600 to-transparent mb-6" />
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-luxury-cream/40 hover:text-gold-300 transition-all duration-300 text-sm tracking-wide hover:tracking-wider hover:pl-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-gold-300 font-display text-lg mb-8 tracking-[0.15em] uppercase">Support</h3>
              <div className="w-8 h-[1px] bg-gradient-to-r from-gold-600 to-transparent mb-6" />
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-luxury-cream/40 hover:text-gold-300 transition-all duration-300 text-sm tracking-wide hover:tracking-wider hover:pl-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.3))' }} />
          <span className="text-gold-600 text-lg">◆</span>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.3), transparent)' }} />
        </div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-luxury-cream/25 text-xs tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} Veenus Kleding. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-luxury-cream/25 hover:text-gold-400 text-xs tracking-[0.1em] uppercase transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="text-gold-900/30">|</span>
              <Link href="#" className="text-luxury-cream/25 hover:text-gold-400 text-xs tracking-[0.1em] uppercase transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
