import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer, ThemeProvider } from "@/components";
import { StoreProvider } from "@/lib/StoreProvider";
import { AuthProvider } from "@/lib/AuthProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://veenuskleding.com";
const SITE_NAME = "Veenus Kleding";
const SITE_DESCRIPTION =
  "Veenus Kleding – Premium luxury fashion brand offering designer clothing, elegant dresses, exclusive collections, and timeless pieces crafted with the finest materials. Shop online for women's luxury wear.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Veenus Kleding | Luxury Fashion & Designer Clothing – Wear Like an Angel",
    template: "%s | Veenus Kleding",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Veenus Kleding",
    "luxury fashion",
    "designer clothing",
    "premium wear",
    "elegant fashion",
    "luxury dresses",
    "women fashion",
    "designer wear online",
    "exclusive collections",
    "high-end clothing",
    "luxury fashion brand",
    "online fashion store",
    "veenuskleding",
    "veenus clothing",
    "premium fashion Netherlands",
    "luxury clothing store",
    "fashion boutique online",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Veenus Kleding | Luxury Fashion & Designer Clothing",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veenus Kleding – Luxury Fashion & Designer Clothing",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veenus Kleding | Luxury Fashion & Designer Clothing",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@veenuskleding",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png" }],
  },
  manifest: "/manifest.json",
  category: "fashion",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+31-20-123-4567",
      contactType: "customer service",
      email: "hello@veenuskleding.com",
      availableLanguage: ["English", "Dutch"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Keizersgracht 123",
      addressLocality: "Amsterdam",
      postalCode: "1015 CW",
      addressCountry: "NL",
    },
    sameAs: [
      "https://www.instagram.com/veenuskleding",
      "https://www.facebook.com/veenuskleding",
      "https://www.tiktok.com/@veenuskleding",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/categories?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('veenus-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}})()` }} />
        <link rel="preload" href="/hero-enhanced.webp" as="image" type="image/webp" media="(min-width: 768px)" />
        <link rel="preload" href="/hero-enhanced-mobile.webp" as="image" type="image/webp" media="(max-width: 767px)" />
        <link rel="preload" href="/hero2.webp" as="image" type="image/webp" />
        <link rel="preload" href="/hero3.webp" as="image" type="image/webp" />
        <link rel="preload" href="/hero-dsc4143.webp" as="image" type="image/webp" />
        <link rel="preload" href="/crafted.webp" as="image" type="image/webp" />
        <link rel="preload" href="/dsc4143-crafted.webp" as="image" type="image/webp" />
        <link rel="preload" href="/background-optimized.webp" as="image" type="image/webp" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body text-luxury-light antialiased`}
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        <ThemeProvider>
          <AuthProvider>
          <StoreProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
