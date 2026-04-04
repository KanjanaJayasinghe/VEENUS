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
      href={`/products/view?slug=${product.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-gold-900/15 hover:border-gold-600/30 transition-all duration-700 hover:-translate-y-2" style={{ background: `linear-gradient(to bottom, var(--card-bg-from), var(--card-bg-to))`, boxShadow: 'var(--card-shadow, none)' }}>
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-[800ms] group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          
          {/* Overlay gradient – removed in light mode via CSS vars */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), var(--product-card-ov)), rgba(var(--image-overlay), var(--product-card-ov-mid)), transparent)` }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), var(--product-card-ov-hover)), rgba(var(--image-overlay), var(--product-card-ov-hover-mid)), transparent)` }} />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new && (
              <span className="px-3 py-1 rounded-full text-luxury-black text-[9px] font-bold uppercase tracking-[0.12em]" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37, #B8860B)' }}>
                New
              </span>
            )}
            {product.bestseller && (
              <span className="px-3 py-1 rounded-full backdrop-blur-md text-gold-300 text-[9px] font-bold uppercase tracking-[0.12em] border border-gold-600/30" style={{ backgroundColor: 'var(--badge-bg)' }}>
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 rounded-full bg-red-900/80 backdrop-blur-md text-red-300 text-[9px] font-bold uppercase tracking-[0.12em]">
                Sale
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span className="block w-full py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-luxury-black rounded-xl" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37, #B8860B)' }}>
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-gold-500 text-[9px] uppercase tracking-[0.2em] mb-1.5 font-medium">
            {product.category.name}
          </p>
          
          {/* Name */}
          <h3 className="font-display text-base text-luxury-cream group-hover:text-gold-300 transition-colors duration-500 mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-luxury-cream/30 text-xs line-clamp-1 mb-3 font-light">
            {product.shortDescription}
          </p>
          
          {/* Price & Colors row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gold-300 font-semibold text-base">
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
                  className="w-3.5 h-3.5 rounded-full border border-gold-800/20 ring-1 ring-transparent group-hover:ring-gold-700/30 transition-all duration-300"
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
      </div>
    </Link>
  );
}
