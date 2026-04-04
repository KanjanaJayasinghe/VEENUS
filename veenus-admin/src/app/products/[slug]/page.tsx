import { getProducts } from '@/lib/firestore';
import ProductEditClient from './ProductEditClient';

export async function generateStaticParams() {
  try {
    const data = await getProducts();
    if (data.products.length > 0) {
      return data.products.map((p) => ({ slug: p.slug }));
    }
  } catch {}
  return [{ slug: 'placeholder' }];
}

export default function EditProductPage({ params }: { params: { slug: string } }) {
  return <ProductEditClient params={params} />;
}
