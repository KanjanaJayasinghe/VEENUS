'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, SectionHeader } from '@/components';
import { useStore } from '@/lib/StoreProvider';
import { getCollectionBySlug, getProductsByCollection } from '@/lib/firestore';

export default function CollectionPageClient({ slug: slugProp }: { slug?: string } = {}) {
  const params = useParams();
  const slug = slugProp || (params.slug as string);
  const { products, collections, loading } = useStore();

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

  const collection = getCollectionBySlug(collections, slug);
  const collectionProducts = getProductsByCollection(products, slug);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-luxury-cream mb-4">Collection Not Found</h1>
          <Link href="/collections" className="btn-outline">Back to Collections</Link>
        </div>
      </div>
    );
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: `https://veenuskleding.com/collections/${collection.slug}`,
    image: collection.image,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Veenus Kleding',
      url: 'https://veenuskleding.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collectionProducts.length,
      itemListElement: collectionProducts.slice(0, 10).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `https://veenuskleding.com/products/${p.slug}`,
      })),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(var(--image-overlay), 0.95), rgba(var(--image-overlay), 0.65), rgba(var(--image-overlay), 0.25))' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(var(--image-overlay), 0.45), transparent)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 80%, rgba(184,134,11,0.08), transparent 50%)' }} />

        {/* Content */}
        <div className="relative w-full pb-12 sm:pb-20">
          <div className="container-luxury">
            {/* Season Badge */}
            {collection.season && (
              <span className="inline-block px-5 py-2 backdrop-blur-sm text-gold-300 text-[10px] uppercase tracking-[0.4em] mb-6 border border-gold-600/30" style={{ background: 'linear-gradient(135deg, rgba(184,134,11,0.12), rgba(92,67,5,0.08))' }}>
                {collection.season} {collection.year}
              </span>
            )}

            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-luxury-cream mb-3 sm:mb-5">
              <span className="text-gradient-gold">{collection.name}</span>
            </h1>
            <div className="w-20 h-[1px] mb-6" style={{ background: 'linear-gradient(90deg, #B8860B, #D4AF37, transparent)' }} />
            <p className="text-luxury-cream/50 text-sm sm:text-lg md:text-xl max-w-2xl font-light">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, var(--bg-page), transparent)' }} />
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="container-luxury">
          <SectionHeader
            subtitle={`${collectionProducts.length} Pieces`}
            title="Shop the Collection"
          />

          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {collectionProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-gold-600 text-3xl block mb-4">◎</span>
              <p className="text-luxury-cream/40 text-lg font-light">
                New pieces coming soon. Stay tuned for updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
                <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em]">
                  The Story
                </p>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-luxury-cream mb-6 sm:mb-8 leading-[1.1]">
                Behind <span className="text-gradient-gold italic">{collection.name}</span>
              </h2>
              <div className="w-16 h-[1px] mb-8" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
              <div className="space-y-5 text-luxury-cream/40 leading-[1.9] text-[15px]">
                <p>
                  The {collection.name} collection represents the pinnacle of our design philosophy —
                  where timeless elegance meets contemporary sophistication.
                </p>
                <p>
                  Each piece in this collection has been carefully crafted using the finest materials,
                  with attention to every detail that makes Veenus Kleding unique.
                </p>
                <p>
                  From the initial sketch to the final stitch, our artisans pour their expertise
                  and passion into creating garments that transcend seasons and trends.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5]">
              <Image
                src={collection.image}
                alt={`${collection.name} details`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-5 border border-gold-600/20" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(var(--image-overlay), 0.35), transparent, transparent)' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
