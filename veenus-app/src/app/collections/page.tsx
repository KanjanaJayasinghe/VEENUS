import { Metadata } from 'next';
import { CollectionCard, SectionHeader } from '@/components';
import { collections } from '@/data';

export const metadata: Metadata = {
  title: 'Collections | Veenus Kleding',
  description: 'Explore our curated collections of luxury fashion. Each collection tells a unique story of elegance and craftsmanship.',
};

export default function CollectionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.85)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.08), transparent 60%)' }} />

        {/* Decorative corners */}
        <div className="absolute top-28 left-8 w-20 h-20 border-t border-l border-gold-700/20 hidden lg:block" />
        <div className="absolute top-28 right-8 w-20 h-20 border-t border-r border-gold-700/20 hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-gold-700/20 hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-gold-700/20 hidden lg:block" />

        {/* Content */}
        <div className="relative text-center px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em] animate-fade-in">
              Discover
            </p>
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-luxury-cream mb-4 sm:mb-6 animate-fade-in-up">
            Our <span className="text-gradient-gold">Collections</span>
          </h1>
          <p className="text-luxury-cream/40 text-sm sm:text-lg max-w-2xl mx-auto animate-fade-in-up delay-100 font-light">
            Each collection is a journey through elegance, craftsmanship, and timeless artistry
          </p>
          <div className="divider-gold mt-10 animate-fade-in delay-200" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--bg-page), transparent)' }} />
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24 relative">
        <div className="container-luxury">
          {/* Featured first collection */}
          <div className="mb-6">
            <CollectionCard
              key={collections[0].id}
              collection={collections[0]}
              index={0}
              size="large"
            />
          </div>

          {/* Remaining collections in responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.slice(1).map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index + 1}
                size="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Collections */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              subtitle="The Art of Curation"
              title="Thoughtfully Designed"
              description="Every Veenus collection is born from a vision — a story we wish to tell through fabric, form, and finesse."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mt-10 sm:mt-16">
              {[
                {
                  title: 'Seasonal Inspiration',
                  description: 'Each collection draws inspiration from the changing seasons, global trends, and timeless elegance.',
                },
                {
                  title: 'Master Craftsmanship',
                  description: 'Our artisans bring decades of experience to every piece, ensuring exceptional quality.',
                },
                {
                  title: 'Sustainable Luxury',
                  description: 'We source responsibly, creating pieces that are as kind to the earth as they are beautiful.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 border border-gold-700/30 flex items-center justify-center rotate-45 group-hover:border-gold-500/60 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(184,134,11,0.15)]">
                    <span className="text-gold-400 text-2xl font-display -rotate-45">{index + 1}</span>
                  </div>
                  <h3 className="text-gold-300 font-display text-lg mb-3 tracking-wider">{item.title}</h3>
                  <div className="w-8 h-[1px] mx-auto mb-4" style={{ background: 'linear-gradient(90deg, transparent, #5C4305, transparent)' }} />
                  <p className="text-luxury-cream/35 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
