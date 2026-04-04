import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components';

export const metadata: Metadata = {
  title: 'About Us | Veenus Kleding',
  description: 'Discover the story behind Veenus Kleding. Learn about our commitment to luxury, craftsmanship, and timeless elegance.',
};

const values = [
  {
    title: 'Excellence',
    description: 'We pursue perfection in every stitch, every fabric choice, and every design decision.',
    icon: '◎',
  },
  {
    title: 'Craftsmanship',
    description: 'Our artisans bring generations of expertise to create pieces that stand the test of time.',
    icon: '◎',
  },
  {
    title: 'Sustainability',
    description: 'We source responsibly and create with consciousness for our planet and future.',
    icon: '◎',
  },
  {
    title: 'Elegance',
    description: 'Every piece embodies refined sophistication that transcends fleeting trends.',
    icon: '◎',
  },
];

const milestones = [
  { year: '2018', title: 'The Beginning', description: 'Veenus Kleding was founded with a vision to redefine luxury fashion.' },
  { year: '2019', title: 'First Collection', description: 'Launched our debut collection, Noir Elegance, to critical acclaim.' },
  { year: '2021', title: 'Global Expansion', description: 'Extended our reach to fashion capitals across Europe and Asia.' },
  { year: '2023', title: 'Sustainability Pledge', description: 'Committed to 100% sustainable sourcing by 2025.' },
  { year: '2026', title: 'New Horizons', description: 'Continuing to push boundaries in luxury fashion design.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.9)' }} />

        {/* background-optimized.webp ornamental overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />

        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(180,130,20,0.08) 0%, transparent 70%)' }} />

        {/* Decorative corner frames */}
        <div className="absolute top-6 left-4 sm:top-8 sm:left-8 w-16 h-16 sm:w-24 sm:h-24 hidden sm:block rounded-tl-3xl border-t border-l border-gold-600/15" />
        <div className="absolute top-6 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 hidden sm:block rounded-tr-3xl border-t border-r border-gold-600/15" />
        <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 w-16 h-16 sm:w-24 sm:h-24 hidden sm:block rounded-bl-3xl border-b border-l border-gold-600/15" />
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 hidden sm:block rounded-br-3xl border-b border-r border-gold-600/15" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: `rgba(212, 175, 55, ${0.15 + (i % 4) * 0.05})`,
                left: `${8 + i * 7.5}%`,
                top: `${15 + (i * 13) % 70}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative text-center px-4 max-w-4xl">
          <p className="text-gold-400 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 animate-fade-in" style={{ textShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
            Our Story
          </p>
          <h1 className="heading-display text-luxury-light mb-6 animate-fade-in-up" style={{ textShadow: 'var(--heading-text-shadow)' }}>
            Wear Like an <span className="text-gradient-gold">Angel</span>
          </h1>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in delay-100">
            <div className="h-[1px] w-16 md:w-24 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <div className="w-2 h-2 rounded-full bg-gold-500/50 shadow-[0_0_8px_rgba(184,134,11,0.3)]" />
            <div className="h-[1px] w-16 md:w-24 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #B8860B)' }} />
          </div>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed animate-fade-in-up delay-100 max-w-3xl mx-auto">
            At Veenus Kleding, we believe that true luxury lies not just in the fineness of fabric or
            the precision of tailoring, but in the confidence and elegance that our garments inspire
            in those who wear them.
          </p>
          <div className="divider-gold mt-10 animate-fade-in delay-200" />
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--bg-section), transparent)' }} />
      </section>

      {/* Brand Story */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
        {/* background-optimized.webp subtle overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />

        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative group">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="Veenus Kleding Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gold border overlay */}
                <div className="absolute inset-4 border border-gold-800/40 rounded-xl group-hover:border-gold-500/60 transition-colors duration-700" />
              </div>
              {/* Accent image */}
              <div className="absolute -bottom-8 -right-8 w-48 h-64 hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80"
                  alt="Fashion detail"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-2 border border-gold-500/50 rounded-lg" />
                {/* Gold glow behind accent image */}
                <div className="absolute inset-0" style={{ boxShadow: '0 0 40px rgba(184,134,11,0.15)' }} />
              </div>
            </div>

            <div className="lg:pl-8">
              {/* Gold accent line */}
              <div className="w-12 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
              <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
                The Vision
              </p>
              <h2 className="heading-section text-luxury-light mb-6">
                Born from a Passion for <span className="text-gradient-gold">Excellence</span>
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                <p>
                  Veenus Kleding was born from a singular vision: to create garments that make every
                  individual feel extraordinary. Our founder, inspired by the timeless elegance of
                  classical fashion houses and the innovative spirit of modern design, set out to
                  bridge tradition and contemporary luxury.
                </p>
                <p>
                  Every piece in our collection is a testament to this vision—meticulously crafted
                  using the finest materials sourced from around the world, from Italian silks to
                  Mongolian cashmere, from Japanese denim to Belgian linen.
                </p>
                <p>
                  Our atelier combines traditional craftsmanship with modern techniques, ensuring
                  that each garment meets the highest standards of quality and design. We believe
                  that luxury should be felt, not just seen.
                </p>
              </div>
              {/* Ornamental bottom accent */}
              <div className="flex items-center gap-3 mt-8">
                <div className="h-[1px] w-8 rounded-full" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gold-600/50 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
                <div className="h-[1px] flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #3D2E06 50%, transparent)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Separator */}
      <div className="relative py-4" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-8 md:w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #5C4305)' }} />
        </div>
      </div>

      {/* Values */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        {/* Radial gold glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(180,130,20,0.05) 0%, transparent 60%)' }} />

        <div className="container-luxury relative">
          <SectionHeader
            subtitle="What We Stand For"
            title="Our Values"
            description="The principles that guide every decision we make"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="relative text-center p-6 sm:p-10 border border-gold-900/30 hover:border-gold-700/50 transition-all duration-700 group rounded-2xl"
                style={{ backgroundColor: 'var(--input-bg)' }}
              >
                {/* Gold glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at center, rgba(184,134,11,0.06) 0%, transparent 70%)' }} />

                <div className="relative">
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500" style={{ textShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
                    <span className="text-gradient-gold">{value.icon}</span>
                  </div>
                  <h3 className="font-display text-xl text-luxury-light mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grand Separator */}
      <div className="relative py-4" style={{ backgroundColor: 'var(--bg-section)' }}>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-8 md:w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
          <div className="h-[1px] w-16 md:w-32 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #5C4305)' }} />
        </div>
      </div>

      {/* Timeline */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
        {/* background-optimized.webp overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />

        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Our Journey"
            title="Milestones"
          />
          <div className="relative">
            {/* Timeline line - gold gradient */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, transparent, #B8860B 20%, #D4AF37 50%, #B8860B 80%, transparent)' }}
            />

            <div className="space-y-8 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot - gold gradient with glow */}
                  <div
                    className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 z-10"
                    style={{
                      background: 'linear-gradient(135deg, #5C4305, #D4AF37, #B8860B)',
                      boxShadow: '0 0 15px rgba(212,175,55,0.3), 0 0 30px rgba(184,134,11,0.15)',
                    }}
                  >
                    <div className="absolute inset-[3px] rounded-full" style={{ backgroundColor: 'var(--bg-section-alt)' }} />
                    <div className="absolute inset-[5px] rounded-full" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }} />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 p-6 border border-gold-900/20 hover:border-gold-700/40 transition-all duration-500 rounded-2xl ${
                      index % 2 === 0 ? 'md:pr-20 md:text-right md:mr-8' : 'md:pl-20 md:text-left md:ml-8'
                    }`}
                    style={{ backgroundColor: 'var(--input-bg)' }}
                  >
                    <span
                      className="text-3xl font-display"
                      style={{
                        background: 'linear-gradient(135deg, #5C4305, #D4AF37, #B8860B)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                      }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-xl text-luxury-light mt-2 mb-2 font-display">{milestone.title}</h3>
                    <p className="text-gray-500">{milestone.description}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-1/4 w-96 h-96 border border-gold-700 rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 border border-gold-700 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-gold-800/50 rounded-full" />
        </div>

        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(180,130,20,0.05) 0%, transparent 60%)' }} />

        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Gold accent line */}
              <div className="w-12 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)' }} />
              <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
                The Art of Creation
              </p>
              <h2 className="heading-section text-luxury-light mb-6">
                Master <span className="text-gradient-gold">Craftsmanship</span>
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                <p>
                  Each Veenus garment passes through the hands of our master artisans, who bring
                  decades of experience and an unwavering commitment to excellence. From the
                  initial pattern cutting to the final pressing, every step is performed with
                  meticulous attention to detail.
                </p>
                <p>
                  We source only the finest materials—silks from Como, cashmere from Mongolia,
                  wool from Biella. Each fabric is selected not only for its quality but for
                  its story, its sustainability, and its ability to transform into something
                  extraordinary.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-10">
                {[
                  { number: '50+', label: 'Artisans' },
                  { number: '100+', label: 'Hours per Piece' },
                  { number: '15', label: 'Countries' },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 border border-gold-900/20 rounded-xl" style={{ backgroundColor: 'var(--input-bg)' }}>
                    <div
                      className="text-2xl sm:text-3xl font-display mb-1"
                      style={{
                        background: 'linear-gradient(135deg, #5C4305, #D4AF37, #B8860B)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="aspect-[4/5] relative group rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                    alt="Fashion Model"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 border border-gold-800/30 group-hover:border-gold-500/50 transition-colors duration-500 rounded-xl" />
                </div>
                <div className="aspect-[4/5] relative group rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80"
                    alt="Fashion Detail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 border border-gold-800/30 group-hover:border-gold-500/50 transition-colors duration-500 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
        {/* background-optimized.webp overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background-optimized.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 'var(--pattern-opacity)',
          }}
        />
        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(180,130,20,0.06) 0%, transparent 60%)' }} />

        <div className="container-luxury text-center relative">
          {/* Ornamental top accent */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[1px] w-12 md:w-20 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50 shadow-[0_0_6px_rgba(184,134,11,0.3)]" />
            <div className="h-[1px] w-12 md:w-20 rounded-full" style={{ background: 'linear-gradient(270deg, transparent, #B8860B)' }} />
          </div>

          <p className="text-gold-400 text-sm uppercase tracking-[0.4em] mb-4" style={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>
            Experience Veenus
          </p>
          <h2 className="heading-section text-luxury-light mb-6">
            Ready to Discover <span className="text-gradient-gold">More</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Explore our collections and find the perfect piece that speaks to your unique style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/collections" className="btn-primary">
              Browse Collections
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
