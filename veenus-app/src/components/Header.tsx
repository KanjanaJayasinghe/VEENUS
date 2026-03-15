'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Shop', href: '/categories' },
  { name: 'Orders', href: '/orders' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'luxury-glass'
          : 'bg-transparent'
      }`}
      style={isScrolled ? { boxShadow: 'var(--glass-shadow)' } : undefined}
    >
      {/* Top gold accent line */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #5C4305, #B8860B, #D4AF37, #B8860B, #5C4305, transparent)' }} />

      <nav className="container-luxury">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 group">
            <Image
              src="/logo.png"
              alt="Veenus Kleding"
              width={220}
              height={70}
              className="h-12 md:h-16 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(184,134,11,0.6)]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium text-xs uppercase tracking-[0.3em] transition-all duration-500 group py-2 ${
                  pathname === item.href
                    ? 'text-gold-300'
                    : 'text-luxury-cream/80 hover:text-gold-300'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-500 ${
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ background: 'linear-gradient(90deg, transparent, #B8860B, #D4AF37, #B8860B, transparent)' }}
                />
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                )}
              </Link>
            ))}

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="relative p-2 text-gold-500 hover:text-gold-300 transition-all duration-500 group"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <div className="relative w-5 h-5">
                {/* Sun icon */}
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                {/* Moon icon */}
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              </div>
            </button>
          </div>

          {/* Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className="relative z-10 p-2 text-gold-500 hover:text-gold-300 transition-colors duration-300"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <div className="relative w-5 h-5">
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <svg
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              </div>
            </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 text-gold-300 hover:text-gold-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-7 h-6 flex flex-col justify-between">
              <span className={`block h-[1px] bg-current transform transition-all duration-500 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`block h-[1px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block h-[1px] bg-current transform transition-all duration-500 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </div>
          </button>
          </div>
        </div>
      </nav>

      {/* Bottom accent */}
      <div className={`h-[1px] w-full transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.3), transparent)' }} />

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 0.06 }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.97)' }} />
        <div className="relative flex flex-col items-center justify-center h-full py-24 overflow-y-auto space-y-6 sm:space-y-8">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${pathname === item.href ? 'text-gradient-gold' : 'text-luxury-cream/80 hover:text-gold-300'}`}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 80 + 150}ms` : '0ms' }}
            >
              {item.name}
            </Link>
          ))}
          <div className={`mt-4 transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: isMobileMenuOpen ? '700ms' : '0ms' }}>
            <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
