import Image from 'next/image';
import Link from 'next/link';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  index?: number;
  size?: 'default' | 'large';
}

export default function CollectionCard({ collection, index = 0, size = 'default' }: CollectionCardProps) {
  const isLarge = size === 'large';

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block relative overflow-hidden rounded-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative ${
          isLarge ? 'aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7] lg:aspect-[21/8]' : 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]'
        }`}
      >
        {/* Background Image */}
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover transition-all duration-[800ms] group-hover:scale-105"
          sizes={isLarge ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(to top, rgba(var(--image-overlay), 0.92), rgba(var(--image-overlay), 0.4), rgba(var(--image-overlay), 0.1))` }} />
        <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(to right, rgba(var(--image-overlay), 0.2), transparent)` }} />
        
        {/* Gold glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'radial-gradient(ellipse at center bottom, rgba(184,134,11,0.1), transparent 70%)' }} />

        {/* Content */}
        <div className={`absolute inset-0 flex flex-col justify-end ${
          isLarge ? 'p-6 md:p-10' : 'p-5 md:p-6'
        }`}>
          {/* Season Tag */}
          {collection.season && (
            <span className={`inline-block self-start px-4 py-1.5 rounded-full backdrop-blur-md text-gold-300 uppercase tracking-[0.2em] border border-gold-600/25 ${
              isLarge ? 'text-[10px] mb-4' : 'text-[9px] mb-3'
            }`} style={{ background: 'var(--badge-bg)' }}>
              {collection.season} {collection.year}
            </span>
          )}

          {/* Title */}
          <h3
            className={`font-display text-luxury-cream group-hover:text-gold-300 transition-all duration-500 ${
              isLarge ? 'text-2xl sm:text-3xl md:text-5xl mb-3' : 'text-lg sm:text-xl md:text-2xl mb-2'
            }`}
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
          >
            {collection.name}
          </h3>

          {/* Description */}
          <p
            className={`text-luxury-cream/50 font-light ${
              isLarge ? 'text-sm md:text-base max-w-2xl line-clamp-2 mb-5' : 'text-xs md:text-sm line-clamp-2 mb-4'
            }`}
          >
            {collection.description}
          </p>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-gold-400 font-semibold uppercase group-hover:gap-4 transition-all duration-500 ${
            isLarge ? 'text-xs tracking-[0.25em]' : 'text-[10px] tracking-[0.2em]'
          }`}>
            <span>Explore</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
