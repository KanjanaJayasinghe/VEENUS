'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/products/new': 'Add New Product',
  '/orders': 'Orders',
  '/categories': 'Categories',
  '/collections': 'Collections',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const getTitle = () => {
    if (pageTitles[pathname]) return pageTitles[pathname];
    if (pathname.startsWith('/products/') && pathname !== '/products/new') return 'Edit Product';
    if (pathname.startsWith('/orders/')) return 'Order Details';
    return 'Dashboard';
  };

  const getBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    return segments.map((seg, i) => (
      <span key={i} className="flex items-center">
        <span className="text-[var(--border-hover)] mx-1.5">/</span>
        <span className={i === segments.length - 1 ? 'text-gold-400' : 'text-[var(--text-dim)]'}>
          {seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')}
        </span>
      </span>
    ));
  };

  return (
    <header className="h-16 bg-[var(--bg-sidebar)] border-b border-[var(--border-light)] flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="ml-10 md:ml-0">
        <h1 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">{getTitle()}</h1>
        <div className="hidden sm:flex items-center text-xs">
          <span className="text-[var(--text-dim)]">Admin</span>
          {getBreadcrumb()}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search - hidden on mobile */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-dim)] focus:outline-none focus:border-gold-700 transition-colors"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
          <svg className="w-4 h-4 text-[var(--text-label)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
