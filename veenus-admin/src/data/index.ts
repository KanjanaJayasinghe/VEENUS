import {
  Category,
  Collection,
  Product,
  Customer,
  Order,
  OrderItem,
  DashboardStats,
  RevenueData,
  TopProduct,
} from '@/types';

// ─── Categories (matching main platform) ───

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for every occasion, crafted with the finest materials.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'cat-2',
    name: 'Suits',
    slug: 'suits',
    description: 'Impeccably tailored suits that define sophistication.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    productCount: 2,
  },
  {
    id: 'cat-3',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Premium coats and jackets for the discerning individual.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    productCount: 2,
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'The perfect finishing touches for your ensemble.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'cat-5',
    name: 'Evening Wear',
    slug: 'evening-wear',
    description: 'Exquisite pieces for your most memorable nights.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    productCount: 1,
  },
  {
    id: 'cat-6',
    name: 'Casual Luxury',
    slug: 'casual-luxury',
    description: 'Elevated everyday essentials with uncompromising quality.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    productCount: 2,
  },
];

// ─── Collections (matching main platform) ───

export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'Noir Elegance',
    slug: 'noir-elegance',
    description: 'A celebration of timeless black, reimagined for the modern connoisseur.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    season: 'Fall/Winter',
    year: 2026,
    productCount: 3,
  },
  {
    id: 'col-2',
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Inspired by the ethereal glow of sunset, warm metallic tones and luxurious textures.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    season: 'Spring/Summer',
    year: 2026,
    productCount: 3,
  },
  {
    id: 'col-3',
    name: 'Midnight Royale',
    slug: 'midnight-royale',
    description: 'Deep blues and rich purples meet exquisite craftsmanship.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    season: 'Fall/Winter',
    year: 2026,
    productCount: 3,
  },
  {
    id: 'col-4',
    name: 'Pure Essence',
    slug: 'pure-essence',
    description: 'Minimalist elegance at its finest. Clean lines and impeccable tailoring.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    season: 'Resort',
    year: 2026,
    productCount: 3,
  },
];

// ─── Products (matching main platform) ───

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Noir Silk Evening Gown',
    slug: 'noir-silk-evening-gown',
    price: 2850,
    originalPrice: 3200,
    description: 'An exquisite floor-length gown crafted from the finest mulberry silk.',
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
    stock: 24,
    sku: 'VN-DRS-001',
    status: 'active',
    createdAt: '2025-09-15',
    updatedAt: '2026-03-10',
  },
  {
    id: 'prod-2',
    name: 'Golden Brocade Blazer',
    slug: 'golden-brocade-blazer',
    price: 1850,
    description: 'A statement piece featuring intricate gold brocade weaving on premium Italian wool.',
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
    stock: 18,
    sku: 'VN-STS-001',
    status: 'active',
    createdAt: '2025-10-01',
    updatedAt: '2026-03-08',
  },
  {
    id: 'prod-3',
    name: 'Cashmere Overcoat',
    slug: 'cashmere-overcoat',
    price: 3500,
    description: 'The epitome of winter luxury crafted from the finest Mongolian cashmere.',
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
    stock: 12,
    sku: 'VN-OTR-001',
    status: 'active',
    createdAt: '2025-08-20',
    updatedAt: '2026-02-28',
  },
  {
    id: 'prod-4',
    name: 'Crystal Embellished Clutch',
    slug: 'crystal-embellished-clutch',
    price: 890,
    description: 'A mesmerizing evening clutch adorned with hand-applied Swarovski crystals.',
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
    stock: 35,
    sku: 'VN-ACC-001',
    status: 'active',
    createdAt: '2025-11-05',
    updatedAt: '2026-03-05',
  },
  {
    id: 'prod-5',
    name: 'Midnight Velvet Tuxedo',
    slug: 'midnight-velvet-tuxedo',
    price: 2400,
    description: 'A showstopping tuxedo crafted from sumptuous Italian velvet.',
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
    stock: 15,
    sku: 'VN-EVN-001',
    status: 'active',
    createdAt: '2025-07-10',
    updatedAt: '2026-03-01',
  },
  {
    id: 'prod-6',
    name: 'Silk Cashmere Sweater',
    slug: 'silk-cashmere-sweater',
    price: 750,
    description: 'The perfect blend of luxury and comfort with cashmere and silk.',
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
    stock: 42,
    sku: 'VN-CSL-001',
    status: 'active',
    createdAt: '2025-12-01',
    updatedAt: '2026-03-06',
  },
  {
    id: 'prod-7',
    name: 'Embroidered Cocktail Dress',
    slug: 'embroidered-cocktail-dress',
    price: 1650,
    description: 'A stunning knee-length dress featuring hand-embroidered floral motifs in gold thread.',
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
    stock: 20,
    sku: 'VN-DRS-002',
    status: 'active',
    createdAt: '2025-10-15',
    updatedAt: '2026-03-09',
  },
  {
    id: 'prod-8',
    name: 'Leather Gloves with Gold Trim',
    slug: 'leather-gloves-gold-trim',
    price: 320,
    description: 'Exquisite lambskin leather gloves with gold trim at the wrist.',
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
    careInstructions: ['Professional leather cleaning', 'Store away from heat'],
    featured: false,
    new: false,
    bestseller: false,
    stock: 50,
    sku: 'VN-ACC-002',
    status: 'active',
    createdAt: '2025-06-20',
    updatedAt: '2026-02-15',
  },
  {
    id: 'prod-9',
    name: 'Double-Breasted Wool Suit',
    slug: 'double-breasted-wool-suit',
    price: 2200,
    originalPrice: 2600,
    description: 'A masterfully tailored double-breasted suit in Super 150s Italian wool.',
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
    stock: 22,
    sku: 'VN-STS-002',
    status: 'active',
    createdAt: '2025-08-01',
    updatedAt: '2026-03-02',
  },
  {
    id: 'prod-10',
    name: 'Sequined Evening Cape',
    slug: 'sequined-evening-cape',
    price: 1200,
    description: 'A dramatic evening cape adorned with thousands of hand-sewn sequins.',
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
    stock: 8,
    sku: 'VN-OTR-002',
    status: 'active',
    createdAt: '2025-11-20',
    updatedAt: '2026-03-07',
  },
  {
    id: 'prod-11',
    name: 'Cashmere Wrap Dress',
    slug: 'cashmere-wrap-dress',
    price: 1450,
    description: 'An elegantly draped wrap dress in the finest cashmere.',
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
    stock: 16,
    sku: 'VN-CSL-002',
    status: 'active',
    createdAt: '2025-09-01',
    updatedAt: '2026-02-20',
  },
  {
    id: 'prod-12',
    name: 'Silk Bow Tie Set',
    slug: 'silk-bow-tie-set',
    price: 180,
    description: 'A curated set of three silk bow ties in complementary shades.',
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
    stock: 60,
    sku: 'VN-ACC-003',
    status: 'active',
    createdAt: '2025-12-10',
    updatedAt: '2026-03-04',
  },
];

// ─── Customers ───

export const customers: Customer[] = [
  {
    id: 'cust-1', name: 'Sophia Laurent', email: 'sophia.laurent@email.com', phone: '+1 (555) 123-4567',
    address: '742 Fifth Avenue', city: 'New York', postalCode: '10019', country: 'United States',
    totalOrders: 8, totalSpent: 18450, createdAt: '2025-03-15',
  },
  {
    id: 'cust-2', name: 'Alexander Beaumont', email: 'alex.beaumont@email.com', phone: '+44 20 7946 0958',
    address: '15 Savile Row', city: 'London', postalCode: 'W1S 3PR', country: 'United Kingdom',
    totalOrders: 12, totalSpent: 34200, createdAt: '2025-01-20',
  },
  {
    id: 'cust-3', name: 'Isabella Romano', email: 'isabella.romano@email.com', phone: '+39 06 5551234',
    address: 'Via Montenapoleone 8', city: 'Milan', postalCode: '20121', country: 'Italy',
    totalOrders: 5, totalSpent: 12800, createdAt: '2025-06-10',
  },
  {
    id: 'cust-4', name: 'James Worthington III', email: 'jworthington@email.com', phone: '+1 (555) 987-6543',
    address: '250 Park Avenue', city: 'New York', postalCode: '10177', country: 'United States',
    totalOrders: 15, totalSpent: 52600, createdAt: '2024-11-05',
  },
  {
    id: 'cust-5', name: 'Amélie Dubois', email: 'amelie.dubois@email.com', phone: '+33 1 42 68 53 00',
    address: '31 Rue Cambon', city: 'Paris', postalCode: '75001', country: 'France',
    totalOrders: 7, totalSpent: 21300, createdAt: '2025-04-22',
  },
  {
    id: 'cust-6', name: 'William Chen', email: 'william.chen@email.com', phone: '+852 2893 6888',
    address: '1 Queens Road Central', city: 'Hong Kong', postalCode: '999077', country: 'Hong Kong',
    totalOrders: 10, totalSpent: 41500, createdAt: '2025-02-18',
  },
  {
    id: 'cust-7', name: 'Victoria Sterling', email: 'v.sterling@email.com', phone: '+1 (555) 246-8135',
    address: '9876 Rodeo Drive', city: 'Beverly Hills', postalCode: '90210', country: 'United States',
    totalOrders: 20, totalSpent: 68900, createdAt: '2024-09-01',
  },
  {
    id: 'cust-8', name: 'Henrik Andersen', email: 'henrik.a@email.com', phone: '+45 33 15 10 12',
    address: 'Strøget 52', city: 'Copenhagen', postalCode: '1160', country: 'Denmark',
    totalOrders: 3, totalSpent: 7250, createdAt: '2025-08-14',
  },
  {
    id: 'cust-9', name: 'Sakura Tanaka', email: 'sakura.t@email.com', phone: '+81 3-5555-1234',
    address: '4-12-10 Ginza', city: 'Tokyo', postalCode: '104-0061', country: 'Japan',
    totalOrders: 6, totalSpent: 15800, createdAt: '2025-05-30',
  },
  {
    id: 'cust-10', name: 'Marcus Van Der Berg', email: 'marcus.vdb@email.com', phone: '+31 20 555 1234',
    address: 'P.C. Hooftstraat 45', city: 'Amsterdam', postalCode: '1071 BN', country: 'Netherlands',
    totalOrders: 4, totalSpent: 9600, createdAt: '2025-07-08',
  },
];

// ─── Orders ───

export const orders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'VN-2026-001',
    customer: customers[0],
    items: [
      { id: 'oi-1', product: products[0], size: 'S', color: products[0].colors[0], quantity: 1, price: 2850 },
      { id: 'oi-2', product: products[3], size: 'One Size', color: products[3].colors[0], quantity: 1, price: 890 },
    ],
    subtotal: 3740, shipping: 0, tax: 374, total: 4114,
    status: 'delivered', paymentStatus: 'paid',
    createdAt: '2026-03-01', updatedAt: '2026-03-06',
  },
  {
    id: 'ord-2',
    orderNumber: 'VN-2026-002',
    customer: customers[1],
    items: [
      { id: 'oi-3', product: products[4], size: 'L', color: products[4].colors[0], quantity: 1, price: 2400 },
    ],
    subtotal: 2400, shipping: 50, tax: 240, total: 2690,
    status: 'shipped', paymentStatus: 'paid',
    createdAt: '2026-03-03', updatedAt: '2026-03-08',
  },
  {
    id: 'ord-3',
    orderNumber: 'VN-2026-003',
    customer: customers[2],
    items: [
      { id: 'oi-4', product: products[6], size: 'M', color: products[6].colors[0], quantity: 1, price: 1650 },
      { id: 'oi-5', product: products[7], size: 'M', color: products[7].colors[0], quantity: 1, price: 320 },
    ],
    subtotal: 1970, shipping: 35, tax: 197, total: 2202,
    status: 'processing', paymentStatus: 'paid',
    createdAt: '2026-03-05', updatedAt: '2026-03-07',
  },
  {
    id: 'ord-4',
    orderNumber: 'VN-2026-004',
    customer: customers[3],
    items: [
      { id: 'oi-6', product: products[2], size: 'XL', color: products[2].colors[0], quantity: 1, price: 3500 },
      { id: 'oi-7', product: products[8], size: 'XL', color: products[8].colors[0], quantity: 1, price: 2200 },
      { id: 'oi-8', product: products[11], size: 'Adjustable', color: products[11].colors[0], quantity: 2, price: 360 },
    ],
    subtotal: 6060, shipping: 0, tax: 606, total: 6666,
    status: 'delivered', paymentStatus: 'paid',
    createdAt: '2026-02-28', updatedAt: '2026-03-05',
  },
  {
    id: 'ord-5',
    orderNumber: 'VN-2026-005',
    customer: customers[4],
    items: [
      { id: 'oi-9', product: products[5], size: 'S', color: products[5].colors[0], quantity: 2, price: 1500 },
    ],
    subtotal: 1500, shipping: 45, tax: 150, total: 1695,
    status: 'confirmed', paymentStatus: 'paid',
    createdAt: '2026-03-08', updatedAt: '2026-03-08',
  },
  {
    id: 'ord-6',
    orderNumber: 'VN-2026-006',
    customer: customers[5],
    items: [
      { id: 'oi-10', product: products[1], size: 'M', color: products[1].colors[0], quantity: 1, price: 1850 },
      { id: 'oi-11', product: products[10], size: 'M', color: products[10].colors[0], quantity: 1, price: 1450 },
    ],
    subtotal: 3300, shipping: 60, tax: 330, total: 3690,
    status: 'pending', paymentStatus: 'pending',
    createdAt: '2026-03-10', updatedAt: '2026-03-10',
  },
  {
    id: 'ord-7',
    orderNumber: 'VN-2026-007',
    customer: customers[6],
    items: [
      { id: 'oi-12', product: products[0], size: 'M', color: products[0].colors[1], quantity: 1, price: 2850 },
      { id: 'oi-13', product: products[9], size: 'One Size', color: products[9].colors[0], quantity: 1, price: 1200 },
      { id: 'oi-14', product: products[3], size: 'One Size', color: products[3].colors[1], quantity: 1, price: 890 },
    ],
    subtotal: 4940, shipping: 0, tax: 494, total: 5434,
    status: 'delivered', paymentStatus: 'paid',
    createdAt: '2026-02-25', updatedAt: '2026-03-02',
  },
  {
    id: 'ord-8',
    orderNumber: 'VN-2026-008',
    customer: customers[7],
    items: [
      { id: 'oi-15', product: products[5], size: 'L', color: products[5].colors[1], quantity: 1, price: 750 },
    ],
    subtotal: 750, shipping: 55, tax: 75, total: 880,
    status: 'shipped', paymentStatus: 'paid',
    createdAt: '2026-03-07', updatedAt: '2026-03-09',
  },
  {
    id: 'ord-9',
    orderNumber: 'VN-2026-009',
    customer: customers[8],
    items: [
      { id: 'oi-16', product: products[6], size: 'S', color: products[6].colors[1], quantity: 1, price: 1650 },
      { id: 'oi-17', product: products[7], size: 'S', color: products[7].colors[1], quantity: 1, price: 320 },
    ],
    subtotal: 1970, shipping: 70, tax: 197, total: 2237,
    status: 'processing', paymentStatus: 'paid',
    createdAt: '2026-03-09', updatedAt: '2026-03-10',
  },
  {
    id: 'ord-10',
    orderNumber: 'VN-2026-010',
    customer: customers[9],
    items: [
      { id: 'oi-18', product: products[4], size: 'M', color: products[4].colors[1], quantity: 1, price: 2400 },
    ],
    subtotal: 2400, shipping: 50, tax: 240, total: 2690,
    status: 'cancelled', paymentStatus: 'refunded',
    createdAt: '2026-03-04', updatedAt: '2026-03-06',
  },
  {
    id: 'ord-11',
    orderNumber: 'VN-2026-011',
    customer: customers[0],
    items: [
      { id: 'oi-19', product: products[10], size: 'S', color: products[10].colors[1], quantity: 1, price: 1450 },
    ],
    subtotal: 1450, shipping: 0, tax: 145, total: 1595,
    status: 'delivered', paymentStatus: 'paid',
    createdAt: '2026-02-20', updatedAt: '2026-02-26',
  },
  {
    id: 'ord-12',
    orderNumber: 'VN-2026-012',
    customer: customers[3],
    items: [
      { id: 'oi-20', product: products[1], size: 'XL', color: products[1].colors[1], quantity: 1, price: 1850 },
      { id: 'oi-21', product: products[8], size: 'XL', color: products[8].colors[1], quantity: 1, price: 2200 },
    ],
    subtotal: 4050, shipping: 0, tax: 405, total: 4455,
    status: 'delivered', paymentStatus: 'paid',
    createdAt: '2026-02-15', updatedAt: '2026-02-22',
  },
  {
    id: 'ord-13',
    orderNumber: 'VN-2026-013',
    customer: customers[6],
    items: [
      { id: 'oi-22', product: products[2], size: 'S', color: products[2].colors[1], quantity: 1, price: 3500 },
    ],
    subtotal: 3500, shipping: 0, tax: 350, total: 3850,
    status: 'shipped', paymentStatus: 'paid',
    createdAt: '2026-03-11', updatedAt: '2026-03-12',
  },
  {
    id: 'ord-14',
    orderNumber: 'VN-2026-014',
    customer: customers[4],
    items: [
      { id: 'oi-23', product: products[9], size: 'One Size', color: products[9].colors[1], quantity: 1, price: 1200 },
      { id: 'oi-24', product: products[11], size: 'Adjustable', color: products[11].colors[1], quantity: 3, price: 540 },
    ],
    subtotal: 1740, shipping: 45, tax: 174, total: 1959,
    status: 'pending', paymentStatus: 'pending',
    createdAt: '2026-03-12', updatedAt: '2026-03-12',
  },
  {
    id: 'ord-15',
    orderNumber: 'VN-2026-015',
    customer: customers[8],
    items: [
      { id: 'oi-25', product: products[0], size: 'XS', color: products[0].colors[0], quantity: 1, price: 2850 },
      { id: 'oi-26', product: products[5], size: 'XS', color: products[5].colors[2], quantity: 1, price: 750 },
    ],
    subtotal: 3600, shipping: 70, tax: 360, total: 4030,
    status: 'confirmed', paymentStatus: 'paid',
    createdAt: '2026-03-11', updatedAt: '2026-03-12',
  },
];

// ─── Dashboard Stats ───

export const dashboardStats: DashboardStats = {
  totalRevenue: 248750,
  totalOrders: 156,
  totalProducts: 12,
  totalCustomers: 87,
  revenueChange: 12.5,
  ordersChange: 8.3,
  productsChange: 3,
  customersChange: 15.2,
};

// ─── Revenue Chart Data (Last 30 days) ───

export const revenueData: RevenueData[] = [
  { date: '2026-02-11', revenue: 4200, orders: 3 },
  { date: '2026-02-12', revenue: 6800, orders: 4 },
  { date: '2026-02-13', revenue: 3100, orders: 2 },
  { date: '2026-02-14', revenue: 9500, orders: 6 },
  { date: '2026-02-15', revenue: 7200, orders: 5 },
  { date: '2026-02-16', revenue: 5400, orders: 3 },
  { date: '2026-02-17', revenue: 8100, orders: 5 },
  { date: '2026-02-18', revenue: 6300, orders: 4 },
  { date: '2026-02-19', revenue: 4800, orders: 3 },
  { date: '2026-02-20', revenue: 7600, orders: 5 },
  { date: '2026-02-21', revenue: 11200, orders: 7 },
  { date: '2026-02-22', revenue: 8900, orders: 6 },
  { date: '2026-02-23', revenue: 5500, orders: 4 },
  { date: '2026-02-24', revenue: 6700, orders: 4 },
  { date: '2026-02-25', revenue: 9800, orders: 6 },
  { date: '2026-02-26', revenue: 7300, orders: 5 },
  { date: '2026-02-27', revenue: 4100, orders: 3 },
  { date: '2026-02-28', revenue: 10500, orders: 7 },
  { date: '2026-03-01', revenue: 8400, orders: 5 },
  { date: '2026-03-02', revenue: 6200, orders: 4 },
  { date: '2026-03-03', revenue: 5800, orders: 4 },
  { date: '2026-03-04', revenue: 7900, orders: 5 },
  { date: '2026-03-05', revenue: 9200, orders: 6 },
  { date: '2026-03-06', revenue: 6600, orders: 4 },
  { date: '2026-03-07', revenue: 8800, orders: 6 },
  { date: '2026-03-08', revenue: 11500, orders: 8 },
  { date: '2026-03-09', revenue: 7400, orders: 5 },
  { date: '2026-03-10', revenue: 9100, orders: 6 },
  { date: '2026-03-11', revenue: 12300, orders: 8 },
  { date: '2026-03-12', revenue: 10800, orders: 7 },
];

// ─── Weekly Revenue Data ───

export const weeklyRevenueData: RevenueData[] = [
  { date: 'Week 6', revenue: 42500, orders: 28 },
  { date: 'Week 7', revenue: 51200, orders: 34 },
  { date: 'Week 8', revenue: 48700, orders: 31 },
  { date: 'Week 9', revenue: 55800, orders: 38 },
  { date: 'Week 10', revenue: 61200, orders: 42 },
  { date: 'Week 11', revenue: 68400, orders: 45 },
];

// ─── Monthly Revenue Data ───

export const monthlyRevenueData: RevenueData[] = [
  { date: 'Sep 2025', revenue: 145000, orders: 89 },
  { date: 'Oct 2025', revenue: 168000, orders: 105 },
  { date: 'Nov 2025', revenue: 195000, orders: 128 },
  { date: 'Dec 2025', revenue: 242000, orders: 165 },
  { date: 'Jan 2026', revenue: 178000, orders: 112 },
  { date: 'Feb 2026', revenue: 205000, orders: 138 },
  { date: 'Mar 2026', revenue: 248750, orders: 156 },
];

// ─── Top Products ───

export const topProducts: TopProduct[] = [
  { product: products[0], totalSold: 45, revenue: 128250 },
  { product: products[2], totalSold: 38, revenue: 133000 },
  { product: products[4], totalSold: 32, revenue: 76800 },
  { product: products[8], totalSold: 28, revenue: 61600 },
  { product: products[6], totalSold: 24, revenue: 39600 },
];

// ─── Category Sales Distribution ───

export const categorySales = [
  { name: 'Dresses', value: 35, revenue: 87062 },
  { name: 'Suits', value: 22, revenue: 54725 },
  { name: 'Outerwear', value: 18, revenue: 44775 },
  { name: 'Accessories', value: 12, revenue: 29850 },
  { name: 'Evening Wear', value: 8, revenue: 19900 },
  { name: 'Casual Luxury', value: 5, revenue: 12437 },
];

// ─── Recent Activity ───

export const recentActivity = [
  { id: 'act-1', type: 'order' as const, message: 'New order VN-2026-014 from Amélie Dubois', time: '5 minutes ago' },
  { id: 'act-2', type: 'order' as const, message: 'Order VN-2026-013 shipped to Victoria Sterling', time: '2 hours ago' },
  { id: 'act-3', type: 'product' as const, message: 'Stock updated for Silk Cashmere Sweater', time: '3 hours ago' },
  { id: 'act-4', type: 'customer' as const, message: 'New customer registered: Marcus Van Der Berg', time: '5 hours ago' },
  { id: 'act-5', type: 'order' as const, message: 'Order VN-2026-010 cancelled and refunded', time: '8 hours ago' },
  { id: 'act-6', type: 'product' as const, message: 'Sequined Evening Cape marked as low stock', time: '1 day ago' },
  { id: 'act-7', type: 'order' as const, message: 'Order VN-2026-008 shipped to Henrik Andersen', time: '1 day ago' },
  { id: 'act-8', type: 'customer' as const, message: 'Victoria Sterling reached VIP status (20 orders)', time: '2 days ago' },
];

// ─── Helper functions ───

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection?.slug === collectionSlug);
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getOrdersByStatus(status: string): Order[] {
  return orders.filter((o) => o.status === status);
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}
