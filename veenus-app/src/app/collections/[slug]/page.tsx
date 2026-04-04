import { getCollections } from '@/lib/firestore';
import CollectionPageClient from './CollectionPageClient';

export async function generateStaticParams() {
  try {
    const collections = await getCollections();
    if (collections.length > 0) {
      return collections.map((c) => ({ slug: c.slug }));
    }
  } catch {}
  return [{ slug: 'placeholder' }];
}

export default function CollectionPage() {
  return <CollectionPageClient />;
}