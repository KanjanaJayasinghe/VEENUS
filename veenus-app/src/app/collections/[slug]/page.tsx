import { collections } from '@/data';
import CollectionPageClient from './CollectionPageClient';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default function CollectionPage() {
  return <CollectionPageClient />;
}