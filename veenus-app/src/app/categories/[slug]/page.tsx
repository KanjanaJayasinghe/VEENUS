import { Metadata } from 'next';
import { getCategories } from '@/lib/firestore';
import CategoryPageClient from './CategoryPageClient';

const SITE_URL = 'https://veenuskleding.com';

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    if (categories.length > 0) {
      return categories.map((c) => ({ slug: c.slug }));
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
    const categories = await getCategories();
    const category = categories.find((c) => c.slug === params.slug);

    if (category) {
      const title = `${category.name} – Luxury ${category.name} Collection`;
      const description =
        category.description ||
        `Shop premium ${category.name.toLowerCase()} from Veenus Kleding. Discover luxury designer ${category.name.toLowerCase()} crafted with the finest materials.`;
      const url = `${SITE_URL}/categories/${category.slug}`;

      return {
        title,
        description,
        keywords: [
          category.name,
          `luxury ${category.name.toLowerCase()}`,
          `designer ${category.name.toLowerCase()}`,
          'Veenus Kleding',
          `buy ${category.name.toLowerCase()} online`,
          'premium fashion',
        ],
        alternates: { canonical: url },
        openGraph: {
          title: `${category.name} – Veenus Kleding`,
          description,
          url,
          type: 'website',
          images: [{ url: category.image || '/og-image.png', width: 800, height: 600, alt: category.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${category.name} – Veenus Kleding`,
          description,
          images: [category.image || '/og-image.png'],
        },
      };
    }
  } catch {}

  return {
    title: 'Category – Luxury Fashion',
    description: 'Browse luxury fashion categories at Veenus Kleding.',
  };
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}