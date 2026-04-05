'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useAuth } from '@/lib/AuthProvider';
import AuthModal from './AuthModal';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Shop', href: '/categories' },
  { name: 'Orders', href: '/orders' },
  { name: 'Lucky Wheel', href: '/lucky-wheel' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { toggleTheme, isDark } = useTheme();
  const { user, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await signOut();
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'luxury-glass py-1'
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

            {/* User Account - Desktop */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="relative flex items-center gap-2 p-1 group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-luxury-black transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(184,134,11,0.4)]" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }}>
                      {getInitials(user.displayName)}
                    </div>
                  </button>
                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 border border-gold-900/30 bg-[var(--bg-section)] shadow-xl z-50" style={{ backdropFilter: 'blur(20px)' }}>
                      <div className="p-4 border-b border-gold-900/15">
                        <p className="text-luxury-cream text-sm font-medium truncate">{user.displayName || 'User'}</p>
                        <p className="text-luxury-cream/30 text-xs truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/lucky-wheel"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-luxury-cream/70 hover:text-gold-300 hover:bg-gold-900/10 transition-colors"
                        >
                          <span className="text-base">🎡</span>
                          Lucky Wheel
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-luxury-cream/70 hover:text-gold-300 hover:bg-gold-900/10 transition-colors"
                        >
                          <span className="text-base">📦</span>
                          Orders
                        </Link>
                      </div>
                      <div className="border-t border-gold-900/15 py-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors w-full text-left"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="relative p-2 text-gold-500 hover:text-gold-300 transition-all duration-500 group"
                  aria-label="Sign in"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Theme Toggle + User + Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile user icon */}
            {user ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative z-10"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-luxury-black" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }}>
                  {getInitials(user.displayName)}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="relative z-10 p-2 text-gold-500 hover:text-gold-300 transition-colors duration-300"
                aria-label="Sign in"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>
            )}
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
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] transition-all duration-700">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 0.06 }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--image-overlay), 0.97)' }} />

          {/* Close Button - fixed top-right */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-gold-300 hover:text-gold-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo at top */}
          <div className="absolute top-5 left-5 z-10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Veenus Kleding"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-full py-20 px-6 overflow-y-auto">
            <nav className="flex flex-col items-center gap-5 sm:gap-7">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl sm:text-2xl font-display uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-all duration-500 transform translate-y-0 opacity-100 ${
                    pathname === item.href ? 'text-gradient-gold' : 'text-luxury-cream/80 hover:text-gold-300 active:text-gold-300'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <div className="w-16 h-[1px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, transparent)' }} />
            </div>

            {/* Mobile Auth */}
            <div className="mt-6">
              {user ? (
                <div className="text-center space-y-3">
                  <p className="text-luxury-cream/50 text-sm">
                    Signed in as <span className="text-gold-400">{user.displayName || user.email}</span>
                  </p>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleSignOut(); }}
                    className="text-sm uppercase tracking-[0.2em] text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setShowAuthModal(true); }}
                  className="text-lg font-display uppercase tracking-[0.3em] text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              className="mt-5 flex items-center gap-2 text-luxury-cream/40 hover:text-gold-300 transition-colors text-xs uppercase tracking-[0.2em]"
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}
