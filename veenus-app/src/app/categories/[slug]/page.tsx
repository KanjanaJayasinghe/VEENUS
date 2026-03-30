import { categories } from '@/data';
import CategoryPageClient from './CategoryPageClient';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}