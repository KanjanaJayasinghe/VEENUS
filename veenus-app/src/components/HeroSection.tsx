'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80',
    title: 'Noir Elegance',
    subtitle: 'Fall/Winter 2026',
    description: 'Discover the art of timeless sophistication in every thread',
    cta: 'Explore Collection',
    href: '/collections/noir-elegance',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    title: 'Golden Hour',
    subtitle: 'Spring/Summer 2026',
    description: 'Embrace the warmth of luxury woven in gold',
    cta: 'Shop Now',
    href: '/collections/golden-hour',
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
    title: 'Midnight Royale',
    subtitle: 'Exclusive Collection',
    description: 'For those who command attention & radiate power',
    cta: 'View Collection',
    href: '/collections/midnight-royale',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 600);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 600);
    }
  };

  return (
    <section className="relative h-screen min-h-[550px] sm:min-h-[650px] md:min-h-[800px] overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1500ms] ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlays – always dark for text readability on hero images */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(var(--image-overlay), 0.93), rgba(var(--image-overlay-section), 0.65), rgba(var(--image-overlay-section), 0.35))` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(var(--image-overlay), 0.45), transparent, rgba(var(--image-overlay), 0.95))` }} />
      
      {/* Gold radial glow */}
      <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(184,134,11,0.15), transparent 60%)' }} />

      {/* Ornamental Background Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('/background-optimized.webp')" }} />

      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: `radial-gradient(circle, rgba(212,175,55,${0.3 + Math.random() * 0.4}), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Corner Frames */}
      <div className="absolute top-28 left-8 w-24 h-24 border-t border-l border-gold-600/20 hidden lg:block" />
      <div className="absolute top-28 right-8 w-24 h-24 border-t border-r border-gold-600/20 hidden lg:block" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-b border-l border-gold-600/20 hidden lg:block" />
      <div className="absolute bottom-20 right-8 w-24 h-24 border-b border-r border-gold-600/20 hidden lg:block" />

      {/* Content */}
      <div className="relative h-full container-luxury flex items-center">
        <div className="max-w-4xl">
          {/* Ornamental Line */}
          <div
            className={`overflow-hidden mb-8 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          >
            <div className="flex items-center gap-4 animate-fade-in-up">
              <div className="w-12 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, transparent)' }} />
              <span className="text-gold-400 text-xs">✦</span>
            </div>
          </div>

          {/* Subtitle */}
          <div
            className={`overflow-hidden mb-5 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-700`}
          >
            <p className="text-gold-400 text-xs md:text-sm uppercase tracking-[0.5em] font-medium animate-fade-in-up" style={{ textShadow: '0 0 20px rgba(184,134,11,0.4)' }}>
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          {/* Title */}
          <div
            className={`overflow-hidden mb-8 ${isAnimating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'} transition-all duration-700 delay-100`}
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] animate-fade-in-up delay-100">
              <span className="text-gradient-gold" style={{ textShadow: '0 4px 30px rgba(184,134,11,0.3)' }}>
                {heroSlides[currentSlide].title}
              </span>
            </h1>
          </div>

          {/* Decorative divider */}
          <div className={`mb-8 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 delay-150`}>
            <div className="flex items-center gap-3">
              <div className="w-20 h-[1px]" style={{ background: 'linear-gradient(90deg, #B8860B, #D4AF37)' }} />
              <span className="text-gold-500 text-[10px]">◆</span>
              <div className="w-8 h-[1px] bg-gold-700/50" />
            </div>
          </div>

          {/* Description */}
          <div
            className={`overflow-hidden mb-12 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-700 delay-200`}
          >
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-luxury-cream/70 font-light tracking-wide leading-relaxed animate-fade-in-up delay-200 max-w-2xl">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`overflow-hidden flex flex-wrap gap-3 sm:gap-6 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-700 delay-300`}
          >
            <Link
              href={heroSlides[currentSlide].href}
              className="btn-primary animate-fade-in-up delay-300"
            >
              {heroSlides[currentSlide].cta}
              <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/collections"
              className="btn-outline animate-fade-in-up delay-400"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators - vertical line design */}
      <div className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group flex flex-col items-center gap-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${index === currentSlide ? 'text-gold-300 opacity-100' : 'text-luxury-cream/30 opacity-0 group-hover:opacity-100'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={`block transition-all duration-500 ${
              index === currentSlide
                ? 'w-16 h-[2px]'
                : 'w-8 h-[1px] hover:w-12'
            }`} style={{ background: index === currentSlide ? 'linear-gradient(90deg, transparent, #B8860B, #D4AF37, #B8860B, transparent)' : 'rgba(184,134,11,0.3)' }} />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 right-10 hidden lg:flex flex-col items-center gap-4">
        <span className="text-gold-600/60 text-[10px] uppercase tracking-[0.3em] rotate-90 origin-center translate-x-8 mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-20 overflow-hidden">
          <div className="w-full h-full animate-pulse" style={{ background: 'linear-gradient(to bottom, #B8860B, transparent)' }} />
        </div>
      </div>

      {/* Decorative rotating diamond */}
      <div className="absolute top-1/3 right-16 w-40 h-40 border border-gold-700/10 rotate-45 hidden xl:block animate-spin-slow" />
      <div className="absolute top-1/3 right-20 w-24 h-24 border border-gold-600/10 rotate-45 hidden xl:block" style={{ animation: 'spin 25s linear infinite reverse' }} />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to top, var(--bg-page), transparent)` }} />
      {/* Extra fade for light mode so hero meets page bg smoothly */}
      <div className="absolute bottom-0 left-0 right-0 h-8" style={{ backgroundColor: 'var(--bg-page)' }} />
    </section>
  );
}
