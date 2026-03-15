'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Products', href: '/products', icon: '👗' },
  { label: 'Orders', href: '/orders', icon: '📦' },
  { label: 'Categories', href: '/categories', icon: '🏷️' },
  { label: 'Collections', href: '/collections', icon: '✨' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Reports', href: '/reports', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[260px] h-screen bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#1a1a1a]">
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-semibold text-[#555] uppercase tracking-[0.15em] px-3 mb-3">
          Main Menu
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              isActive(item.href)
                ? 'bg-gradient-to-r from-gold-900/30 to-transparent text-gold-300 border-l-2 border-gold-500'
                : 'text-[#888] hover:text-[#ccc] hover:bg-[#161616]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="text-[10px] font-semibold text-[#555] uppercase tracking-[0.15em] px-3 mt-6 mb-3">
          Settings
        </div>
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
            isActive('/settings')
              ? 'bg-gradient-to-r from-gold-900/30 to-transparent text-gold-300 border-l-2 border-gold-500'
              : 'text-[#888] hover:text-[#ccc] hover:bg-[#161616]'
          }`}
        >
          <span className="text-base">⚙️</span>
          <span className="font-medium">Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-700 to-gold-500 flex items-center justify-center text-white text-xs font-bold">
            VA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#e5e5e5] truncate">Veenus Admin</p>
            <p className="text-xs text-[#555]">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
