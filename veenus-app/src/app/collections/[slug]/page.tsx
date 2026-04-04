import { Metadata } from 'next';
import { getCollections } from '@/lib/firestore';
import CollectionPageClient from './CollectionPageClient';

const SITE_URL = 'https://veenuskleding.com';

export async function generateStaticParams() {
  try {
    const collections = await getCollections();
    if (collections.length > 0) {
      return collections.map((c) => ({ slug: c.slug }));
    }
  } catch {}
  return [{ slug: 'placeholder' }];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const collections = await getCollections();
    const collection = collections.find((c) => c.slug === params.slug);

    if (collection) {
      const seasonText = collection.season ? ` – ${collection.season}` : '';
      const yearText = collection.year ? ` ${collection.year}` : '';
      const title = `${collection.name}${seasonText}${yearText} Collection`;
      const description =
        collection.description ||
        `Explore the ${collection.name} collection by Veenus Kleding. Exclusive luxury designer fashion${seasonText}${yearText}.`;
      const url = `${SITE_URL}/collections/${collection.slug}`;

      return {
        title,
        description,
        keywords: [
          collection.name,
          `${collection.name} collection`,
          'luxury fashion collection',
          'designer collection',
          'Veenus Kleding',
          'exclusive fashion',
          collection.season || '',
        ].filter(Boolean),
        alternates: { canonical: url },
        openGraph: {
          title: `${collection.name} Collection – Veenus Kleding`,
          description,
          url,
          type: 'website',
          images: [{ url: collection.image || '/og-image.png', width: 800, height: 600, alt: collection.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${collection.name} Collection – Veenus Kleding`,
          description,
          images: [collection.image || '/og-image.png'],
        },
      };
    }
  } catch {}

  return {
    title: 'Collection – Luxury Fashion',
    description: 'Explore exclusive luxury fashion collections at Veenus Kleding.',
  };
}

export default function CollectionPage() {
  return <CollectionPageClient />;
}