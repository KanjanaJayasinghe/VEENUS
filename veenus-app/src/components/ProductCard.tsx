import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden border border-gold-900/20 hover:border-gold-600/40 transition-all duration-700 hover:-translate-y-1" style={{ background: `linear-gradient(to bottom, var(--card-bg-from), var(--card-bg-to))`, boxShadow: 'var(--card-shadow, none)' }}>
        {/* Top gold accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-600/50 to-transparent group-hover:via-gold-400/80 transition-all duration-700" />

        {/* Image Container */}
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-[800ms] group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          
          {/* Dark overlay gradient – always dark for image readability */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.85), transparent, transparent)` }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.9), transparent, transparent)` }} />
          
          {/* Gold shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(184,134,11,0.06) 50%, transparent 60%)' }} />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new && (
              <span className="px-3 py-1 text-luxury-black text-[9px] font-bold uppercase tracking-[0.15em]" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37, #B8860B)' }}>
                New
              </span>
            )}
            {product.bestseller && (
              <span className="px-3 py-1 backdrop-blur-sm text-gold-300 text-[9px] font-bold uppercase tracking-[0.15em] border border-gold-600/40" style={{ backgroundColor: 'var(--badge-bg)' }}>
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-[#3D0000]/90 text-[#FF6B6B] text-[9px] font-bold uppercase tracking-[0.15em] border border-[#FF6B6B]/20">
                Sale
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span className="block w-full py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-black" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37, #B8860B)' }}>
              View Details
            </span>
          </div>

          {/* Corner ornaments on hover */}
          <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500" />
          <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b border-l border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-gold-600 text-[9px] uppercase tracking-[0.25em] mb-1.5">
            {product.category.name}
          </p>
          
          {/* Name */}
          <h3 className="font-display text-base text-luxury-cream group-hover:text-gold-300 transition-colors duration-500 mb-1.5 line-clamp-1">
            {product.name}
          </h3>

          {/* Subtle divider */}
          <div className="w-8 h-[1px] bg-gradient-to-r from-gold-700/40 to-transparent mb-1.5" />
          
          {/* Description */}
          <p className="text-luxury-cream/30 text-xs line-clamp-1 mb-3 font-light">
            {product.shortDescription}
          </p>
          
          {/* Price & Colors row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gold-300 font-semibold text-base" style={{ textShadow: '0 0 10px rgba(184,134,11,0.2)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-luxury-cream/25 line-through text-xs">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-gold-800/30 hover:border-gold-500/60 transition-colors duration-300 hover:scale-125 transform cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-gold-700 tracking-wide">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-800/20 to-transparent group-hover:via-gold-500/40 transition-all duration-700" />
      </div>
    </Link>
  );
}
