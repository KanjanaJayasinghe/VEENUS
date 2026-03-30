import { products } from '@/data';
import ProductEditClient from './ProductEditClient';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function EditProductPage({ params }: { params: { slug: string } }) {
  return <ProductEditClient params={params} />;
}
