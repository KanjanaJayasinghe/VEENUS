'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, SectionHeader } from '@/components';
import { useStore } from '@/lib/StoreProvider';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/firestore';

export default function CategoryPageClient({ slug: slugProp }: { slug?: string } = {}) {
  const params = useParams();
  const slug = slugProp || (params.slug as string);
  const { products, categories, loading } = useStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-luxury-cream/40 tracking-widest text-sm uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(categories, slug);
  const categoryProducts = getProductsByCategory(products, slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-luxury-cream mb-4">Category Not Found</h1>
          <Link href="/categories" className="btn-outline">Back to Categories</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] min-h-[300px] sm:min-h-[350px] md:min-h-[450px] flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(var(--image-overlay), 0.95), rgba(var(--image-overlay), 0.6), rgba(var(--image-overlay), 0.25))' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(var(--image-overlay), 0.45), transparent)' }} />

        {/* Content */}
        <div className="relative w-full pb-10 sm:pb-16 md:pb-20">
          <div className="container-luxury">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-3 text-xs tracking-wider">
                <li>
                  <Link href="/" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li className="text-gold-800/40">/</li>
                <li>
                  <Link href="/categories" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">
                    Categories
                  </Link>
                </li>
                <li className="text-gold-800/40">/</li>
                <li className="text-gold-400">{category.name}</li>
              </ol>
            </nav>

            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl text-luxury-cream mb-3 sm:mb-5">
              <span className="text-gradient-gold">{category.name}</span>
            </h1>
            <div className="w-16 h-[1px] mb-5" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
            <p className="text-luxury-cream/45 text-sm sm:text-lg md:text-xl max-w-2xl font-light">
              {category.description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg-page), transparent)' }} />
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="container-luxury">
          {/* Header with count */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-12 md:mb-16">
            <div>
              <p className="text-gold-400 text-[11px] uppercase tracking-[0.4em] mb-3">
                {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-luxury-cream">
                Shop <span className="text-gradient-gold">{category.name}</span>
              </h2>
            </div>

            {/* Filter placeholder - for future enhancement */}
            <div className="mt-8 md:mt-0">
              <select className="px-6 py-3 bg-theme-input border border-gold-800/30 text-luxury-cream/70 text-sm focus:outline-none focus:border-gold-500/60 focus:shadow-[0_0_15px_rgba(184,134,11,0.1)] transition-all duration-500 tracking-wider">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {categoryProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 border border-gold-500/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-gold-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl text-luxury-light mb-2">No products found</h3>
              <p className="text-gray-400 mb-6">
                New pieces coming soon. Stay tuned for updates.
              </p>
              <Link href="/categories" className="btn-outline">
                Browse Other Categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)' }} />
        <div className="container-luxury relative">
          <SectionHeader
            subtitle="Continue Exploring"
            title="Other Categories"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories
              .filter((c) => c.slug !== slug)
              .slice(0, 5)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/view?slug=${cat.slug}`}
                  className="group relative overflow-hidden aspect-square"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.65)' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.1), transparent 70%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-display text-base sm:text-xl text-luxury-cream group-hover:text-gold-300 transition-colors duration-500 text-center">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
