import { db, storage } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product, Category, Collection, ProductColor, ShippingSettings, PlaceOrderData } from '@/types';

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

// ─── Shipping Settings ───

export async function getShippingSettings(): Promise<ShippingSettings> {
  const docRef = doc(db, 'settings', 'shipping');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data();
    return { sriLanka: data.sriLanka ?? 500, netherlands: data.netherlands ?? 1500 };
  }
  return { sriLanka: 500, netherlands: 1500 };
}

// ─── Bank Slip Upload ───

export async function uploadBankSlip(orderId: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const storageRef = ref(storage, `bank-slips/${orderId}.${ext}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// ─── Place Order ───

export async function placeOrder(data: PlaceOrderData): Promise<{ orderId: string; orderNumber: string }> {
  const orderNumber = `VK-${Date.now().toString(36).toUpperCase()}`;
  const orderId = `order_${Date.now()}`;
  const now = new Date().toISOString();

  const orderDoc = {
    orderNumber,
    customerId: '',
    customerName: `${data.customer.firstName} ${data.customer.lastName}`,
    customerEmail: data.customer.email,
    customerPhone: data.customer.phone,
    customerAddress: data.customer.address,
    customerCity: data.customer.city,
    customerPostalCode: data.customer.postalCode,
    customerCountry: data.customer.country,
    items: data.items.map((item, i) => ({
      id: `item_${i}`,
      productId: item.productId,
      productName: item.productName,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal: data.subtotal,
    shipping: data.shipping,
    discount: data.discount,
    tax: 0,
    total: data.total,
    status: 'pending',
    paymentStatus: data.paymentMethod === 'bank_transfer' ? 'pending' : 'pending',
    paymentMethod: data.paymentMethod,
    bankSlipUrl: data.bankSlipUrl || '',
    promoCode: data.promoCode || '',
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, 'orders', orderId), orderDoc);
  return { orderId, orderNumber };
}

// ─── Update Order Bank Slip ───

export async function updateOrderBankSlip(orderId: string, bankSlipUrl: string): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), { bankSlipUrl });
}

// ─── Update Product Stock ───

export async function updateProductStock(productId: string, quantityChange: number): Promise<void> {
  await updateDoc(doc(db, 'products', productId), { stock: increment(quantityChange) });
}
