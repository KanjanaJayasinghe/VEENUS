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
      href={`/categories/view?slug=${category.slug}`}
      className="group block relative overflow-hidden rounded-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[3/4]">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-all duration-[800ms] group-hover:scale-105 group-hover:brightness-[0.7]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), var(--card-ov-heavy)), rgba(var(--image-overlay), var(--card-ov-light)), transparent)` }} />

        {/* Soft gold glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(circle at center, rgba(184,134,11,0.12), transparent 70%)' }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-8 text-center">
          {/* Category Name */}
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-luxury-cream group-hover:text-gold-300 transition-all duration-500" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
            {category.name}
          </h3>
          
          {/* View text */}
          <p className="text-gold-400 text-[10px] uppercase tracking-[0.3em] mt-3 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
            Explore →
          </p>
        </div>
      </div>
    </Link>
  );
}
