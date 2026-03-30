'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeroSection, ProductCard, CollectionCard, CategoryCard, SectionHeader } from '@/components';
import { useStore } from '@/lib/StoreProvider';
import { getFeaturedProducts, getNewArrivals } from '@/lib/firestore';

export default function Home() {
  const { products, categories, collections } = useStore();
  const featuredProducts = getFeaturedProducts(products);
  const newArrivals = getNewArrivals(products);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <section className="section-luxury py-16 md:py-20 relative">
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Explore Our World"
            title="Shop by Category"
            description="Discover our curated selection of luxury fashion, handcrafted for those who demand excellence"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Grand Separator */}
      <div className="relative py-8" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="flex items-center justify-center gap-6">
          <div className="w-32 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #5C4305)' }} />
          <div className="w-3 h-3 rotate-45 border border-gold-600/50" />
          <span className="text-gold-600 text-sm">✦</span>
          <div className="w-3 h-3 rotate-45 border border-gold-600/50" />
          <div className="w-32 h-[1px]" style={{ background: 'linear-gradient(90deg, #5C4305, transparent)' }} />
        </div>
      </div>

      {/* Featured Collection - Large Banner */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/background-optimized.webp')", backgroundSize: 'cover', opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Latest Collection"
            title="Noir Elegance"
            description="A celebration of timeless black, reimagined for the modern connoisseur of luxury"
          />
          {collections[0] && (
            <CollectionCard collection={collections[0]} size="large" />
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-luxury py-16 md:py-20 relative">
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Handpicked for You"
            title="Featured Products"
            description="Our most coveted pieces, selected for their exceptional quality and timeless design"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/categories" className="btn-outline">
              View All Products
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section - Grand Design */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-section)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(184,134,11,0.04), transparent 60%)' }} />
        
        {/* Decorative floating frames */}
        <div className="absolute top-20 right-10 w-72 h-72 border border-gold-800/10 rotate-45 hidden xl:block" />
        <div className="absolute bottom-20 right-24 w-40 h-40 border border-gold-700/10 rotate-12 hidden xl:block" />
        <div className="absolute top-40 left-10 w-24 h-24 border border-gold-800/10 -rotate-12 hidden xl:block" />

        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                  alt="Veenus Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gold frame overlay */}
                <div className="absolute inset-5 border border-gold-600/20" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.6), transparent, transparent)` }} />
              </div>
              {/* Floating accent image */}
              <div className="absolute -bottom-10 -right-10 w-56 h-56 hidden lg:block" style={{ boxShadow: '0 0 60px rgba(0,0,0,0.4)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80"
                  alt="Fashion Detail"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
                <div className="absolute inset-3 border border-gold-500/30" />
              </div>
              {/* Gold accent line */}
              <div className="absolute -left-6 top-1/3 w-12 h-[1px] hidden lg:block" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            </div>

            {/* Content Side */}
            <div className="lg:pl-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em]">
                  Our Story
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-[1.1]">
                <span className="text-luxury-cream">Crafted with</span>{' '}
                <span className="text-gradient-gold italic">Passion</span>
                <br />
                <span className="text-luxury-cream">&amp; Precision</span>
              </h2>
              <div className="w-20 h-[1px] mb-8" style={{ background: 'linear-gradient(90deg, #B8860B, #D4AF37, transparent)' }} />
              <div className="space-y-5 text-luxury-cream/40 leading-[1.9] text-[15px]">
                <p>
                  At Veenus Kleding, we believe that luxury is not just about wearing clothes — it&apos;s about
                  wearing confidence, elegance, and a piece of artistry that tells your unique story.
                </p>
                <p>
                  Every garment in our collection is meticulously crafted using the finest materials
                  sourced from around the world, from Italian silks to Mongolian cashmere, each chosen for
                  its exceptional quality.
                </p>
                <p>
                  Our commitment to excellence extends beyond the fabric. It&apos;s in every stitch,
                  every detail, and every moment you spend wearing our creations.
                </p>
              </div>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link href="/about" className="btn-primary">
                  Discover Our Heritage
                </Link>
                <Link href="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Stats Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-section)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(var(--image-overlay), 0.8), transparent, rgba(var(--image-overlay), 0.8))` }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #5C4305, #B8860B, #5C4305, transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #5C4305, #B8860B, #5C4305, transparent)' }} />
        
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { number: '150+', label: 'Exclusive Designs' },
              { number: '50K+', label: 'Happy Clients' },
              { number: '25+', label: 'Countries Served' },
              { number: '15+', label: 'Years of Excellence' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display text-gradient-gold mb-3" style={{ textShadow: '0 0 30px rgba(184,134,11,0.2)' }}>
                  {stat.number}
                </div>
                <div className="w-8 h-[1px] mx-auto mb-3" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
                <p className="text-luxury-cream/40 text-xs uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-luxury py-16 md:py-20 relative">
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Just Arrived"
            title="New Arrivals"
            description="Be the first to experience our latest creations, fresh from our ateliers"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {newArrivals.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Seasonal Collections"
            title="Explore Our World"
            description="Each collection tells a unique story of elegance, artistry, and timeless craftsmanship"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {collections.slice(1).map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Grand Design */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        {/* Ornamental background */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-page)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.05), transparent 60%)' }} />
        
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-gold-800/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold-700/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold-600/5 rounded-full" />

        <div className="container-luxury relative text-center">
          <SectionHeader
            subtitle="Stay Connected"
            title="Join the Veenus World"
            description="Subscribe to receive exclusive updates, early access to new collections, and special invitations"
          />
          <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 sm:px-8 py-4 sm:py-5 border border-gold-800/30 text-luxury-cream placeholder-luxury-cream/25 focus:outline-none focus:border-gold-500/60 focus:shadow-[0_0_20px_rgba(184,134,11,0.1)] transition-all duration-500 tracking-wider text-sm"
              style={{ backgroundColor: 'var(--bg-input)' }}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-luxury-cream/20 text-xs mt-6 tracking-wider">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>

      {/* Trust Badges - Luxury Design */}
      <section className="py-20 md:py-24 relative" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)' }} />
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-16">
            {[
              { icon: '✦', title: 'Premium Quality', desc: 'Finest materials from around the world' },
              { icon: '✦', title: 'Global Shipping', desc: 'Worldwide luxury delivery service' },
              { icon: '✦', title: 'Easy Returns', desc: '30-day hassle-free return policy' },
              { icon: '✦', title: 'Secure Shopping', desc: 'Your data privacy guaranteed' },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="text-gold-500 text-2xl mb-4 transition-transform duration-500 group-hover:scale-125" style={{ textShadow: '0 0 15px rgba(184,134,11,0.3)' }}>{item.icon}</div>
                <h3 className="text-gold-300 font-display text-base mb-2 tracking-wider">{item.title}</h3>
                <div className="w-6 h-[1px] mx-auto mb-3" style={{ background: 'linear-gradient(90deg, transparent, #5C4305, transparent)' }} />
                <p className="text-luxury-cream/30 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)' }} />
      </section>
    </>
  );
}
