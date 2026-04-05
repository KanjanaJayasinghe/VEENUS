'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Products', href: '/products', icon: '👗' },
  { label: 'Orders', href: '/orders', icon: '📦' },
  { label: 'Categories', href: '/categories', icon: '🏷️' },
  { label: 'Collections', href: '/collections', icon: '✨' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Lucky Wheel', href: '/lucky-wheel', icon: '🎡' },
  { label: 'Reports', href: '/reports', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-40 w-[260px] h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-light)] flex flex-col flex-shrink-0 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-light)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-700 via-gold-500 to-gold-300 flex items-center justify-center text-white font-display font-bold text-lg">
              V
            </div>
            <div>
              <span className="text-gradient-gold font-display text-lg font-semibold tracking-wide">
                VEENUS
              </span>
              <span className="block text-[10px] text-gold-600 tracking-[0.2em] uppercase -mt-1">
                Admin Panel
              </span>
            </div>
          </Link>
          {/* Mobile close */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-semibold text-[var(--text-dim)] uppercase tracking-[0.15em] px-3 mb-3">
            Main Menu
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-gold-900/30 to-transparent text-gold-300 border-l-2 border-gold-500'
                  : 'text-[var(--text-label)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          <div className="text-[10px] font-semibold text-[var(--text-dim)] uppercase tracking-[0.15em] px-3 mt-6 mb-3">
            Settings
          </div>
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              isActive('/settings')
                ? 'bg-gradient-to-r from-gold-900/30 to-transparent text-gold-300 border-l-2 border-gold-500'
                : 'text-[var(--text-label)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            <span className="text-base">⚙️</span>
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-light)]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-700 to-gold-500 flex items-center justify-center text-white text-xs font-bold">
              VA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">Veenus Admin</p>
              <p className="text-xs text-[var(--text-dim)]">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
