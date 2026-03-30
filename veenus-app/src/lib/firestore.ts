import { db } from './firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { Product, Category, Collection, ProductColor } from '@/types';

interface ProductDoc {
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  categoryId: string;
  collectionId?: string;
  sizes: string[];
  colors: ProductColor[];
  material: string;
  careInstructions: string[];
  featured: boolean;
  new: boolean;
  bestseller: boolean;
}

// ─── Categories ───

export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(db, 'categories'));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Category));
}

export function onCategoriesSnapshot(callback: (cats: Category[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'categories'), (snap) => {
    callback(snap.docs.map((d) => ({ ...d.data(), id: d.id } as Category)));
  });
}

// ─── Collections ───

export async function getCollections(): Promise<Collection[]> {
  const snap = await getDocs(collection(db, 'collections'));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Collection));
}

export function onCollectionsSnapshot(callback: (cols: Collection[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'collections'), (snap) => {
    callback(snap.docs.map((d) => ({ ...d.data(), id: d.id } as Collection)));
  });
}

// ─── Products ───

export async function getProducts(): Promise<Product[]> {
  const [catSnap, colSnap, prodSnap] = await Promise.all([
    getDocs(collection(db, 'categories')),
    getDocs(collection(db, 'collections')),
    getDocs(collection(db, 'products')),
  ]);

  const cats = catSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Category));
  const cols = colSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Collection));

  return prodSnap.docs.map((d) => {
    const data = d.data() as ProductDoc & { id?: string };
    return {
      ...data,
      id: d.id,
      category: cats.find((c) => c.id === data.categoryId) || { id: '', name: 'Unknown', slug: '', description: '', image: '' },
      collection: cols.find((c) => c.id === data.collectionId),
    } as Product;
  });
}

export function onProductsSnapshot(callback: (products: Product[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'products'), async () => {
    const products = await getProducts();
    callback(products);
  });
}

// ─── Helper functions (matching the old static data helpers) ───

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(products: Product[], categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getProductsByCollection(products: Product[], collectionSlug: string): Product[] {
  return products.filter((p) => p.collection?.slug === collectionSlug);
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewArrivals(products: Product[]): Product[] {
  return products.filter((p) => p.new);
}

export function getBestsellers(products: Product[]): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCollectionBySlug(collections: Collection[], slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
