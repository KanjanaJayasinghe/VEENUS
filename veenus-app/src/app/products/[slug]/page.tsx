import { getProducts } from '@/lib/firestore';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    if (products.length > 0) {
      return products.map((p) => ({ slug: p.slug }));
    }
  } catch {}
  return [{ slug: 'placeholder' }];
}

export default function ProductPage() {
  return <ProductDetailClient />;
}