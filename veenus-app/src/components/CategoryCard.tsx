import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block relative overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[3/4]">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-all duration-[800ms] group-hover:scale-115 group-hover:brightness-[0.6]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />

        {/* Gradient Overlays – always dark for text readability on images */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.95), rgba(var(--image-overlay), 0.35), transparent)` }} />

        {/* Gold radial glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at center, rgba(184,134,11,0.15), transparent 70%)' }} />

        {/* Animated border with gold glow */}
        <div className="absolute inset-3 border border-gold-800/0 group-hover:border-gold-500/40 transition-all duration-700 group-hover:shadow-[inset_0_0_30px_rgba(184,134,11,0.08)]" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {/* Top decorative */}
          <div className="flex items-center gap-3 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-3 group-hover:translate-y-0">
            <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <span className="text-gold-500 text-[8px]">✦</span>
            <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
          </div>
          
          {/* Category Name */}
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-luxury-cream group-hover:text-gold-300 transition-all duration-500" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
            {category.name}
          </h3>
          
          {/* View text */}
          <p className="text-gold-400 text-[10px] uppercase tracking-[0.4em] mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            Explore
          </p>
          
          {/* Bottom decorative */}
          <div className="flex items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
            <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B)' }} />
            <span className="text-gold-500 text-[8px]">✦</span>
            <div className="w-8 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
