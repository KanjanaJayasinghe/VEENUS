'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductEditClient from '../[slug]/ProductEditClient';

function EditWrapper() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';
  return <ProductEditClient params={{ slug }} />;
}

export default function EditProductPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[var(--text-muted)]">Loading product...</p>
        </div>
      </div>
    }>
      <EditWrapper />
    </Suspense>
  );
}
