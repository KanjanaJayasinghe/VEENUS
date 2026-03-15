import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
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
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(180,130,20,0.06) 0%, transparent 60%)' }} />

      {/* Decorative corner frames */}
      <div className="absolute top-24 left-8 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
        <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: 'linear-gradient(180deg, #B8860B, transparent)' }} />
      </div>
      <div className="absolute top-24 right-8 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
        <div className="absolute top-0 right-0 h-full w-[1px]" style={{ background: 'linear-gradient(180deg, #B8860B, transparent)' }} />
      </div>
      <div className="absolute bottom-8 left-8 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
        <div className="absolute bottom-0 left-0 h-full w-[1px]" style={{ background: 'linear-gradient(0deg, #B8860B, transparent)' }} />
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: 'linear-gradient(270deg, #B8860B, transparent)' }} />
        <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ background: 'linear-gradient(0deg, #B8860B, transparent)' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: `rgba(212, 175, 55, ${0.1 + (i % 4) * 0.05})`,
              left: `${10 + i * 11}%`,
              top: `${20 + (i * 17) % 60}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* Decorative 404 */}
        <div className="relative inline-block mb-10">
          <span
            className="text-[150px] md:text-[220px] font-display leading-none"
            style={{
              background: 'linear-gradient(135deg, #3D2E06, #5C4305, #D4AF37, #B8860B, #5C4305)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0.2,
            }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-28 h-28 rotate-45"
              style={{
                border: '1px solid rgba(184,134,11,0.3)',
                boxShadow: '0 0 30px rgba(184,134,11,0.1)',
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rotate-45"
              style={{
                border: '1px solid rgba(184,134,11,0.2)',
              }}
            />
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 md:w-24" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
          <span className="text-gold-500 text-xs">◆</span>
          <div className="h-[1px] w-16 md:w-24" style={{ background: 'linear-gradient(270deg, transparent, #B8860B)' }} />
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-luxury-light mb-5" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          Page Not Found
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for seems to have wandered off. Let us guide you back to
          elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/collections" className="btn-outline">
            Browse Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
