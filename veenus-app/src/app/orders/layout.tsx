import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Place an Order – Custom Luxury Fashion',
  description:
    'Place your custom order with Veenus Kleding. Choose from our luxury fashion collection, select sizes, colors, and get exclusive designer clothing delivered to your door.',
  keywords: [
    'custom order luxury fashion',
    'order designer clothing',
    'buy luxury fashion online',
    'Veenus Kleding order',
    'custom fashion order',
  ],
  alternates: {
    canonical: 'https://veenuskleding.com/orders',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Place an Order – Veenus Kleding',
    description: 'Place your custom order for exclusive luxury fashion.',
    url: 'https://veenuskleding.com/orders',
    type: 'website',
  },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
