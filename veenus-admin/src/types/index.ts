// ─── Base Types (matching main Venus platform) ───

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: Category;
  collection?: Collection;
  sizes: string[];
  colors: ProductColor[];
  material: string;
  careInstructions: string[];
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  stock?: number;
  sku?: string;
  status?: 'active' | 'draft' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  season?: string;
  year?: number;
  productCount?: number;
}

// ─── Admin-specific Types ───

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  signInMethod?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  bankSlipUrl: string;
  promoCode: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  customersChange: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  product: Product;
  totalSold: number;
  revenue: number;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// ─── Lucky Wheel Types ───

export interface WheelSegment {
  id: string;
  label: string;
  type: 'try_again' | 'discount' | 'free_shipping';
  value: number;
  color: string;
  textColor: string;
}

export interface LuckyWheelConfig {
  id: string;
  segments: WheelSegment[];
  tryAgainThreshold: number;
  globalTryAgainCounter: number;
  maxSpinsPerMonth: number;
  enabled: boolean;
  updatedAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'discount' | 'free_shipping';
  value: number;
  userId: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
}

// ─── Inquiries ───

export type InquiryStatus = 'new' | 'read' | 'replied';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}
