'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components';
import { useStore } from '@/lib/StoreProvider';
import { getProductBySlug } from '@/lib/firestore';

export default function ProductDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const { products, loading } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

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

  const product = getProductBySlug(products, slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-luxury-cream mb-4">Product Not Found</h1>
          <Link href="/categories" className="btn-outline">Browse Products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-4 relative">
        <div className="container-luxury">
          <nav>
            <ol className="flex items-center gap-3 text-xs tracking-wider flex-wrap">
              <li>
                <Link href="/" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="text-gold-800/30">/</li>
              <li>
                <Link href="/categories" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li className="text-gold-800/30">/</li>
              <li>
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300"
                >
                  {product.category.name}
                </Link>
              </li>
              <li className="text-gold-800/30">/</li>
              <li className="text-gold-400 truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-6 sm:py-8 md:py-16 relative">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-5">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-theme-input border border-gold-900/15">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {product.new && (
                    <span className="px-4 py-1.5 text-luxury-black text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37, #B8860B)' }}>
                      New Arrival
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-4 py-1.5 bg-overlay-section-90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase tracking-[0.2em] border border-gold-600/40">
                      Bestseller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-4 py-1.5 bg-[#3D0000]/90 text-[#FF6B6B] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#FF6B6B]/20">
                      Sale
                    </span>
                  )}
                </div>

                {/* Gold frame */}
                <div className="absolute inset-5 border border-gold-700/15 pointer-events-none" />
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 overflow-hidden transition-all duration-500 border ${
                        selectedImage === index
                          ? 'border-gold-500 shadow-[0_0_15px_rgba(184,134,11,0.2)]'
                          : 'border-gold-900/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Category & Collection */}
              <div className="flex items-center gap-3 mb-5">
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-gold-400 text-[10px] uppercase tracking-[0.4em] hover:text-gold-300 transition-colors duration-300"
                >
                  {product.category.name}
                </Link>
                {product.collection && (
                  <>
                    <span className="text-gold-800/40">•</span>
                    <Link
                      href={`/collections/${product.collection.slug}`}
                      className="text-luxury-cream/30 text-[10px] uppercase tracking-[0.4em] hover:text-gold-400 transition-colors duration-300"
                    >
                      {product.collection.name}
                    </Link>
                  </>
                )}
              </div>

              {/* Name */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl text-luxury-cream mb-4 sm:mb-5 leading-[1.1]">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gold-300 text-2xl md:text-3xl font-semibold" style={{ textShadow: '0 0 15px rgba(184,134,11,0.2)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-luxury-cream/25 text-xl line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-luxury-cream/40 text-base sm:text-lg mb-8 sm:mb-10 leading-[1.8] font-light">
                {product.shortDescription}
              </p>

              {/* Divider */}
              <div className="h-[1px] mb-10" style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.2), transparent)' }} />

              {/* Color Selection */}
              <div className="mb-6 sm:mb-10">
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-3 sm:mb-5">
                  Color: <span className="text-gold-300">{product.colors[selectedColor].name}</span>
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full transition-all duration-500 ${
                        selectedColor === index
                          ? 'ring-2 ring-gold-500 ring-offset-2 shadow-[0_0_15px_rgba(184,134,11,0.3)]'
                          : 'hover:scale-110 ring-1 ring-gold-800/20'
                      }`}
                      style={{ backgroundColor: color.hex, ['--tw-ring-offset-color' as string]: 'var(--bg-page)' }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <h3 className="text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60">
                    Size
                  </h3>
                  <button className="text-gold-400 text-xs hover:text-gold-300 transition-colors duration-300 tracking-wider">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] sm:min-w-[64px] px-3 sm:px-5 py-2.5 sm:py-3.5 border text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
                        selectedSize === size
                          ? 'text-luxury-black shadow-[0_0_20px_rgba(184,134,11,0.3)]'
                          : 'border-gold-800/25 text-luxury-cream/60 hover:border-gold-500/50 hover:text-luxury-cream'
                      }`}
                      style={selectedSize === size ? { background: 'linear-gradient(135deg, #B8860B, #D4AF37)', borderColor: '#D4AF37' } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                <button className="btn-primary flex-1">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
                <Link href="/orders" className="btn-outline flex-1 text-center">
                  Order This Piece
                </Link>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div className="pt-8" style={{ borderTop: '1px solid rgba(184,134,11,0.12)' }}>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-4">
                    Material
                  </h3>
                  <p className="text-luxury-cream/40 font-light">{product.material}</p>
                </div>

                <div className="pt-8" style={{ borderTop: '1px solid rgba(184,134,11,0.12)' }}>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-4">
                    Description
                  </h3>
                  <p className="text-luxury-cream/40 leading-[1.9] font-light">{product.description}</p>
                </div>

                <div className="pt-8" style={{ borderTop: '1px solid rgba(184,134,11,0.12)' }}>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 mb-4">
                    Care Instructions
                  </h3>
                  <ul className="space-y-3">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="text-luxury-cream/40 flex items-center gap-3 font-light">
                        <span className="w-1 h-1 rounded-full" style={{ background: '#B8860B' }} />
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.2), transparent)' }} />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
          <div className="container-luxury relative">
            <div className="text-center mb-16">
              <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em] mb-5">
                You May Also Like
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-luxury-cream">
                Related <span className="text-gradient-gold">Products</span>
              </h2>
              <div className="divider-gold mt-8" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
