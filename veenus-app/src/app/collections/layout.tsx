import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Collections – Exclusive Designer Fashion',
  description:
    'Explore Veenus Kleding exclusive fashion collections. From Noir Elegance to seasonal collections, discover premium designer pieces crafted with the finest materials.',
  keywords: [
    'luxury fashion collections',
    'designer collections',
    'exclusive fashion',
    'seasonal collections',
    'Veenus Kleding collections',
    'premium designer wear',
    'haute couture collections',
  ],
  alternates: {
    canonical: 'https://veenuskleding.com/collections',
  },
  openGraph: {
    title: 'Luxury Collections – Veenus Kleding',
    description:
      'Explore exclusive fashion collections. Premium designer pieces crafted with the finest materials.',
    url: 'https://veenuskleding.com/collections',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Veenus Kleding Collections' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Collections – Veenus Kleding',
    description: 'Explore exclusive fashion collections from Veenus Kleding.',
    images: ['/og-image.png'],
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
