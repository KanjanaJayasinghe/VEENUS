import { getCategories } from '@/lib/firestore';
import CategoryPageClient from './CategoryPageClient';

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    if (categories.length > 0) {
      return categories.map((c) => ({ slug: c.slug }));
    }
  } catch {}
  return [{ slug: 'placeholder' }];
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}