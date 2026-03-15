import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer, ThemeProvider } from "@/components";

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

export const metadata: Metadata = {
  title: "Veenus Kleding | Wear Like an Angel",
  description: "Experience luxury fashion at its finest. Veenus Kleding offers exquisite clothing collections crafted with premium materials and timeless elegance.",
  keywords: ["luxury fashion", "designer clothing", "premium wear", "elegant fashion", "Veenus Kleding"],
  openGraph: {
    title: "Veenus Kleding | Wear Like an Angel",
    description: "Experience luxury fashion at its finest.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/background-optimized.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body text-luxury-light antialiased`}
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
