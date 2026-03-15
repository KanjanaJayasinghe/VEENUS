'use client';

import { usePathname } from 'next/navigation';

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
        <span className="text-[#333] mx-1.5">/</span>
        <span className={i === segments.length - 1 ? 'text-gold-400' : 'text-[#555]'}>
          {seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')}
        </span>
      </span>
    ));
  };

  return (
    <header className="h-16 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-[#e5e5e5]">{getTitle()}</h1>
        <div className="flex items-center text-xs">
          <span className="text-[#555]">Admin</span>
          {getBreadcrumb()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-[#161616] border border-[#222] rounded-lg px-4 py-2 text-sm text-[#e5e5e5] placeholder-[#555] focus:outline-none focus:border-gold-700 transition-colors"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#161616] border border-[#222] hover:border-[#333] transition-colors">
          <svg className="w-4 h-4 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
