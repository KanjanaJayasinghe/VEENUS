'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryPageClient from '../[slug]/CategoryPageClient';

function ViewWrapper() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';
  return <CategoryPageClient slug={slug} />;
}

export default function ViewCategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-luxury-cream/40 tracking-widest text-sm uppercase">Loading...</p>
        </div>
      </div>
    }>
      <ViewWrapper />
    </Suspense>
  );
}
