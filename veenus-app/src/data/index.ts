import { Category, Collection, Product } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for every occasion, crafted with the finest materials.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
  },
  {
    id: 'cat-2',
    name: 'Suits',
    slug: 'suits',
    description: 'Impeccably tailored suits that define sophistication.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
  },
  {
    id: 'cat-3',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Premium coats and jackets for the discerning individual.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'The perfect finishing touches for your ensemble.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
  },
  {
    id: 'cat-5',
    name: 'Evening Wear',
    slug: 'evening-wear',
    description: 'Exquisite pieces for your most memorable nights.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
  },
  {
    id: 'cat-6',
    name: 'Casual Luxury',
    slug: 'casual-luxury',
    description: 'Elevated everyday essentials with uncompromising quality.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
  },
];

export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'Noir Elegance',
    slug: 'noir-elegance',
    description: 'A celebration of timeless black, reimagined for the modern connoisseur. Each piece embodies sophistication and mystery.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    season: 'Fall/Winter',
    year: 2026,
  },
  {
    id: 'col-2',
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Inspired by the ethereal glow of sunset, this collection features warm metallic tones and luxurious textures.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    season: 'Spring/Summer',
    year: 2026,
  },
  {
    id: 'col-3',
    name: 'Midnight Royale',
    slug: 'midnight-royale',
    description: 'For those who command attention. Deep blues and rich purples meet exquisite craftsmanship.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    season: 'Fall/Winter',
    year: 2026,
  },
  {
    id: 'col-4',
    name: 'Pure Essence',
    slug: 'pure-essence',
    description: 'Minimalist elegance at its finest. Clean lines and impeccable tailoring.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    season: 'Resort',
    year: 2026,
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Noir Silk Evening Gown',
    slug: 'noir-silk-evening-gown',
    price: 2850,
    originalPrice: 3200,
    description: 'An exquisite floor-length gown crafted from the finest mulberry silk. The dramatic silhouette features a plunging neckline and an elegant train, perfect for the most prestigious events. Hand-finished with meticulous attention to detail.',
    shortDescription: 'Luxurious silk evening gown with dramatic silhouette',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    ],
    category: categories[0],
    collection: collections[0],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Noir', hex: '#0A0A0A' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
    material: '100% Mulberry Silk',
    careInstructions: ['Dry clean only', 'Store in garment bag', 'Iron on low heat'],
    featured: true,
    new: true,
    bestseller: true,
  },
  {
    id: 'prod-2',
    name: 'Golden Brocade Blazer',
    slug: 'golden-brocade-blazer',
    price: 1850,
    description: 'A statement piece featuring intricate gold brocade weaving on premium Italian wool. The structured shoulders and slim fit create a powerful silhouette that commands attention.',
    shortDescription: 'Statement blazer with intricate gold brocade',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ],
    category: categories[1],
    collection: collections[1],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Bronze', hex: '#CD7F32' },
    ],
    material: 'Italian Wool Blend with Gold Thread',
    careInstructions: ['Dry clean only', 'Store on padded hanger'],
    featured: true,
    new: true,
    bestseller: false,
  },
  {
    id: 'prod-3',
    name: 'Cashmere Overcoat',
    slug: 'cashmere-overcoat',
    price: 3500,
    description: 'The epitome of winter luxury. This full-length overcoat is crafted from the finest Mongolian cashmere, offering unparalleled warmth and sophistication. Features a classic double-breasted design with horn buttons.',
    shortDescription: 'Premium Mongolian cashmere double-breasted overcoat',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
    ],
    category: categories[2],
    collection: collections[0],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#1A1A1A' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    material: '100% Mongolian Cashmere',
    careInstructions: ['Professional dry clean', 'Fold for storage', 'Use cedar blocks'],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: 'prod-4',
    name: 'Crystal Embellished Clutch',
    slug: 'crystal-embellished-clutch',
    price: 890,
    description: 'A mesmerizing evening clutch adorned with hand-applied Swarovski crystals. The gold-plated frame and silk lining make this an heirloom piece. Includes a detachable chain strap.',
    shortDescription: 'Swarovski crystal clutch with gold-plated frame',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    category: categories[3],
    collection: collections[1],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' },
    ],
    material: 'Satin with Swarovski Crystals',
    careInstructions: ['Store in dust bag', 'Handle with care', 'Avoid contact with water'],
    featured: true,
    new: true,
    bestseller: false,
  },
  {
    id: 'prod-5',
    name: 'Midnight Velvet Tuxedo',
    slug: 'midnight-velvet-tuxedo',
    price: 2400,
    description: 'A showstopping tuxedo crafted from sumptuous Italian velvet. The peak lapels and single-button closure create a sleek, modern silhouette. Fully lined in silk for ultimate comfort.',
    shortDescription: 'Italian velvet tuxedo with silk lining',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
    ],
    category: categories[4],
    collection: collections[2],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Deep Purple', hex: '#301934' },
    ],
    material: 'Italian Velvet with Silk Lining',
    careInstructions: ['Dry clean only', 'Steam to remove wrinkles', 'Store on padded hanger'],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: 'prod-6',
    name: 'Silk Cashmere Sweater',
    slug: 'silk-cashmere-sweater',
    price: 750,
    description: 'The perfect blend of luxury and comfort. This relaxed-fit sweater combines the softness of cashmere with the subtle sheen of silk. Features ribbed cuffs and hem.',
    shortDescription: 'Luxurious silk-cashmere blend relaxed sweater',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    ],
    category: categories[5],
    collection: collections[3],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Soft Grey', hex: '#A9A9A9' },
      { name: 'Blush', hex: '#DE5D83' },
    ],
    material: '70% Cashmere, 30% Silk',
    careInstructions: ['Hand wash cold', 'Lay flat to dry', 'Do not hang'],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: 'prod-7',
    name: 'Embroidered Cocktail Dress',
    slug: 'embroidered-cocktail-dress',
    price: 1650,
    description: 'A stunning knee-length dress featuring hand-embroidered floral motifs in gold thread. The fitted bodice and flared skirt create a flattering silhouette perfect for cocktail events.',
    shortDescription: 'Hand-embroidered cocktail dress with gold detailing',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    ],
    category: categories[0],
    collection: collections[1],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black/Gold', hex: '#0A0A0A' },
      { name: 'Navy/Gold', hex: '#000080' },
    ],
    material: 'Silk Organza with Gold Thread Embroidery',
    careInstructions: ['Dry clean only', 'Store flat', 'Handle with care'],
    featured: false,
    new: true,
    bestseller: true,
  },
  {
    id: 'prod-8',
    name: 'Leather Gloves with Gold Trim',
    slug: 'leather-gloves-gold-trim',
    price: 320,
    description: 'Exquisite lambskin leather gloves with an elegant gold trim at the wrist. Lined with pure cashmere for exceptional warmth and comfort.',
    shortDescription: 'Lambskin gloves with cashmere lining',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    ],
    category: categories[3],
    collection: collections[0],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
    material: 'Lambskin Leather with Cashmere Lining',
    careInstructions: ['Professional leather cleaning', 'Store away from heat', 'Use leather conditioner'],
    featured: false,
    new: false,
    bestseller: false,
  },
  {
    id: 'prod-9',
    name: 'Double-Breasted Wool Suit',
    slug: 'double-breasted-wool-suit',
    price: 2200,
    originalPrice: 2600,
    description: 'A masterfully tailored double-breasted suit in Super 150s Italian wool. The classic silhouette is updated with modern proportions and impeccable finishing. Includes jacket and trousers.',
    shortDescription: 'Super 150s Italian wool double-breasted suit',
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ],
    category: categories[1],
    collection: collections[3],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#1A1A1A' },
      { name: 'Navy', hex: '#000080' },
    ],
    material: 'Super 150s Italian Wool',
    careInstructions: ['Dry clean only', 'Press professionally', 'Store on suit hanger'],
    featured: true,
    new: false,
    bestseller: true,
  },
  {
    id: 'prod-10',
    name: 'Sequined Evening Cape',
    slug: 'sequined-evening-cape',
    price: 1200,
    description: 'A dramatic evening cape adorned with thousands of hand-sewn sequins that catch the light beautifully. Features a silk lining and elegant clasp closure.',
    shortDescription: 'Hand-sewn sequined cape with silk lining',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=800&q=80',
    ],
    category: categories[2],
    collection: collections[2],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    material: 'Sequined Fabric with Silk Lining',
    careInstructions: ['Dry clean only', 'Store flat', 'Avoid crushing'],
    featured: false,
    new: true,
    bestseller: false,
  },
  {
    id: 'prod-11',
    name: 'Cashmere Wrap Dress',
    slug: 'cashmere-wrap-dress',
    price: 1450,
    description: 'An elegantly draped wrap dress in the finest cashmere. The flattering silhouette and self-tie belt create a feminine, sophisticated look perfect for any occasion.',
    shortDescription: 'Pure cashmere wrap dress with elegant draping',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    ],
    category: categories[5],
    collection: collections[3],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    material: '100% Pure Cashmere',
    careInstructions: ['Dry clean recommended', 'Hand wash cold', 'Lay flat to dry'],
    featured: false,
    new: false,
    bestseller: true,
  },
  {
    id: 'prod-12',
    name: 'Silk Bow Tie Set',
    slug: 'silk-bow-tie-set',
    price: 180,
    description: 'A curated set of three silk bow ties in complementary shades. Each piece is hand-crafted from pure silk and features an adjustable closure.',
    shortDescription: 'Set of three hand-crafted silk bow ties',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    category: categories[3],
    collection: collections[2],
    sizes: ['Adjustable'],
    colors: [
      { name: 'Classic Set', hex: '#0A0A0A' },
      { name: 'Jewel Tones', hex: '#722F37' },
    ],
    material: '100% Mulberry Silk',
    careInstructions: ['Dry clean only', 'Store flat or rolled', 'Avoid direct sunlight'],
    featured: false,
    new: true,
    bestseller: false,
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection?.slug === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.new);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
