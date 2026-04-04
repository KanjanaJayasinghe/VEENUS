import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop by Category – Luxury Fashion Collections',
  description:
    'Browse Veenus Kleding luxury fashion categories. Discover premium dresses, elegant tops, designer outerwear, accessories, and more. Shop curated collections of high-end clothing.',
  keywords: [
    'luxury fashion categories',
    'designer clothing shop',
    'premium dresses',
    'elegant tops',
    'fashion categories online',
    'Veenus Kleding categories',
    'luxury wear shop',
  ],
  alternates: {
    canonical: 'https://veenuskleding.com/categories',
  },
  openGraph: {
    title: 'Shop by Category – Veenus Kleding Luxury Fashion',
    description:
      'Browse our curated luxury fashion categories. Premium dresses, elegant tops, designer outerwear, and exclusive accessories.',
    url: 'https://veenuskleding.com/categories',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Veenus Kleding Categories' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop by Category – Veenus Kleding',
    description: 'Browse our curated luxury fashion categories.',
    images: ['/og-image.png'],
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
