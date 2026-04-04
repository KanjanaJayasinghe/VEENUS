import { Metadata } from 'next';
import { getProducts } from '@/lib/firestore';
import ProductDetailClient from './ProductDetailClient';

const SITE_URL = 'https://veenuskleding.com';

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    if (products.length > 0) {
      return products.map((p) => ({ slug: p.slug }));
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
    const products = await getProducts();
    const product = products.find((p) => p.slug === params.slug);

    if (product) {
      const title = `${product.name} – Luxury ${product.category.name}`;
      const description = product.shortDescription || product.description.slice(0, 160);
      const ogImage = product.images?.[0] || '/og-image.png';
      const url = `${SITE_URL}/products/${product.slug}`;

      const priceFormatted = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(product.price);

      return {
        title,
        description: `${description} | ${priceFormatted} | Shop now at Veenus Kleding.`,
        keywords: [
          product.name,
          product.category.name,
          product.collection?.name || '',
          'luxury fashion',
          'designer clothing',
          'Veenus Kleding',
          product.material,
          `buy ${product.name.toLowerCase()}`,
        ].filter(Boolean),
        alternates: { canonical: url },
        openGraph: {
          title: `${product.name} – Veenus Kleding`,
          description,
          url,
          type: 'website',
          images: [{ url: ogImage, width: 800, height: 800, alt: product.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${product.name} – Veenus Kleding`,
          description,
          images: [ogImage],
        },
      };
    }
  } catch {}

  return {
    title: 'Product – Luxury Fashion',
    description: 'Discover exclusive luxury fashion products at Veenus Kleding.',
  };
}

export default function ProductPage() {
  return <ProductDetailClient />;
}