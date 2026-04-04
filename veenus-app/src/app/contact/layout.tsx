import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – Get in Touch with Veenus Kleding',
  description:
    'Contact Veenus Kleding for inquiries about luxury fashion, custom orders, or styling appointments. Visit our atelier in Amsterdam or reach us online. We are here to help.',
  keywords: [
    'contact Veenus Kleding',
    'luxury fashion inquiries',
    'fashion store Amsterdam',
    'custom orders',
    'styling appointments',
    'Veenus Kleding contact',
    'fashion boutique contact',
  ],
  alternates: {
    canonical: 'https://veenuskleding.com/contact',
  },
  openGraph: {
    title: 'Contact Us – Veenus Kleding',
    description:
      'Get in touch with Veenus Kleding for luxury fashion inquiries, custom orders, and styling appointments.',
    url: 'https://veenuskleding.com/contact',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Veenus Kleding' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us – Veenus Kleding',
    description: 'Reach us for luxury fashion inquiries, custom orders, and appointments.',
    images: ['/og-image.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
