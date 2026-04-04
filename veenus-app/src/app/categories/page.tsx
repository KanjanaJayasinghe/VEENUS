'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProductCard, SectionHeader } from '@/components';
import { useStore } from '@/lib/StoreProvider';

export default function CategoriesPage() {
  const { categories, products, loading } = useStore();

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {!loading && (<>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.85)' }} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.08), transparent 60%)' }} />

        {/* Content */}
        <div className="relative text-center px-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em] animate-fade-in">
              Explore
            </p>
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-luxury-cream mb-4 sm:mb-6 animate-fade-in-up">
            Shop by <span className="text-gradient-gold">Category</span>
          </h1>
          <p className="text-luxury-cream/40 text-sm sm:text-lg max-w-2xl mx-auto animate-fade-in-up delay-100 font-light">
            Discover our curated selection of luxury fashion categories
          </p>
          <div className="divider-gold mt-10 animate-fade-in delay-200" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--bg-page), transparent)' }} />
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-20 relative">
        <div className="container-luxury">
          <SectionHeader
            subtitle="Browse Categories"
            title="Find Your Style"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden aspect-[4/3] rounded-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-[800ms] group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), var(--card-ov-heavy)), rgba(var(--image-overlay), var(--card-ov-mid)), transparent)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(ellipse at center bottom, rgba(184,134,11,0.12), transparent 70%)' }} />
                <div className="absolute inset-3 border border-gold-800/0 group-hover:border-gold-500/30 transition-all duration-700 rounded-xl" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl text-luxury-cream group-hover:text-gold-300 transition-all duration-500 mb-1.5">
                    {category.name}
                  </h3>
                  <div className="w-6 h-[1px] mb-1.5" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                  <p className="text-luxury-cream/35 text-xs line-clamp-1 mb-2 font-light">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-400 text-[10px] font-medium uppercase tracking-[0.2em]">
                    Shop Now
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)' }} />
        <div className="container-luxury">
          <SectionHeader
            subtitle="Complete Collection"
            title="All Products"
            description="Browse our entire catalog of luxury fashion"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
      </>)}
    </>
  );
}
