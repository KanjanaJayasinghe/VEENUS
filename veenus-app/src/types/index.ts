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
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  season?: string;
  year?: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Lucky Wheel Types ───

export interface WheelSegment {
  id: string;
  label: string;
  type: 'try_again' | 'discount' | 'free_shipping';
  value: number; // discount percentage (0 for try_again/free_shipping)
  color: string;
  textColor: string;
}

export interface LuckyWheelConfig {
  id: string;
  segments: WheelSegment[];
  tryAgainThreshold: number; // consecutive try-again count before reward
  globalTryAgainCounter: number;
  maxSpinsPerMonth: number;
  enabled: boolean;
  updatedAt: string;
}

export interface UserSpinRecord {
  odajdi: string; // document id
  odajdiUserId: string;
  month: string; // format: "2026-04"
  spinCount: number;
  spins: SpinResult[];
}

export interface SpinResult {
  timestamp: string;
  segmentType: 'try_again' | 'discount' | 'free_shipping';
  value: number;
  promoCode?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'discount' | 'free_shipping';
  value: number; // percentage for discount, 0 for free_shipping
  userId: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
}
