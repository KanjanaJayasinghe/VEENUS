import { db, storage } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product, Category, Collection, Customer, Order, OrderItem, ProductColor } from '@/types';

// ─── Image Compression (client-side Canvas) ───

function compressImage(dataUrl: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/webp', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

// ─── Generic Image Upload (to Firebase Storage) ───

async function uploadImage(path: string, dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:')) return dataUrl;
  const matches = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!matches) throw new Error('Invalid image data');
  const mimeType = matches[1];
  const ext = mimeType.includes('webp') ? 'webp' : mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
  const byteString = atob(matches[2]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeType });
  const storageRef = ref(storage, `${path}.${ext}`);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
}

// ─── Product Image Upload ───

export async function uploadProductImage(productId: string, dataUrl: string, index: number): Promise<string> {
  if (!dataUrl.startsWith('data:')) return dataUrl;
  try {
    const compressed = await compressImage(dataUrl, 1200, 1500, 0.82);
    return await uploadImage(`products/${productId}/${index}`, compressed);
  } catch (err) {
    console.error(`Failed to upload product image ${index}:`, err);
    return '';
  }
}

export async function uploadProductImages(productId: string, images: string[]): Promise<string[]> {
  const results = await Promise.all(images.map((img, i) => uploadProductImage(productId, img, i)));
  return results.filter(Boolean);
}

// ─── Collection Image Upload ───

export async function uploadCollectionImage(collectionId: string, dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:')) return dataUrl;
  const compressed = await compressImage(dataUrl, 1600, 900, 0.82);
  return uploadImage(`collections/${collectionId}/cover`, compressed);
}

// ─── Category Image Upload ───

export async function uploadCategoryImage(categoryId: string, dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:')) return dataUrl;
  const compressed = await compressImage(dataUrl, 1200, 900, 0.82);
  return uploadImage(`categories/${categoryId}/cover`, compressed);
}

// ─── Firestore document converters ───

interface ProductDoc {
  id: string;
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
  stock?: number;
  sku?: string;
  status?: 'active' | 'draft' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

interface OrderDoc {
  id: string;
  orderNumber: string;
  customerId: string;
  items: {
    id: string;
    productId: string;
    size: string;
    color: ProductColor;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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

export async function saveCategory(cat: Category): Promise<void> {
  await setDoc(doc(db, 'categories', cat.id), {
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image,
    productCount: cat.productCount || 0,
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', id));
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

export async function saveCollection(col: Collection): Promise<void> {
  await setDoc(doc(db, 'collections', col.id), {
    name: col.name,
    slug: col.slug,
    description: col.description,
    image: col.image,
    season: col.season || '',
    year: col.year || 0,
    productCount: col.productCount || 0,
  });
}

export async function deleteCollection(id: string): Promise<void> {
  await deleteDoc(doc(db, 'collections', id));
}

// ─── Products ───

export async function getProducts(): Promise<{ products: Product[]; categories: Category[]; collections: Collection[] }> {
  const [catSnap, colSnap, prodSnap] = await Promise.all([
    getDocs(collection(db, 'categories')),
    getDocs(collection(db, 'collections')),
    getDocs(collection(db, 'products')),
  ]);

  const cats = catSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Category));
  const cols = colSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Collection));

  const products = prodSnap.docs.map((d) => {
    const data = d.data() as ProductDoc;
    return {
      ...data,
      id: d.id,
      category: cats.find((c) => c.id === data.categoryId) || { id: '', name: 'Unknown', slug: '', description: '', image: '' },
      collection: cols.find((c) => c.id === data.collectionId),
    } as Product;
  });

  return { products, categories: cats, collections: cols };
}

export async function saveProduct(product: Product): Promise<void> {
  const productDoc: Record<string, unknown> = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    description: product.description,
    shortDescription: product.shortDescription,
    images: product.images,
    categoryId: product.category.id,
    collectionId: product.collection?.id || '',
    sizes: product.sizes,
    colors: product.colors,
    material: product.material,
    careInstructions: product.careInstructions,
    featured: product.featured,
    new: product.new,
    bestseller: product.bestseller,
    stock: product.stock ?? 0,
    sku: product.sku ?? '',
    status: product.status || 'active',
    createdAt: product.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  if (product.originalPrice !== undefined) {
    productDoc.originalPrice = product.originalPrice;
  }
  await setDoc(doc(db, 'products', product.id), productDoc);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}

// ─── Customers ───

export async function getCustomers(): Promise<Customer[]> {
  const snap = await getDocs(collection(db, 'customers'));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as Customer));
}

export function onCustomersSnapshot(callback: (custs: Customer[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'customers'), (snap) => {
    callback(snap.docs.map((d) => ({ ...d.data(), id: d.id } as Customer)));
  });
}

export async function saveCustomer(customer: Customer): Promise<void> {
  const { id, ...data } = customer;
  await setDoc(doc(db, 'customers', id), data);
}

export async function deleteCustomer(id: string): Promise<void> {
  await deleteDoc(doc(db, 'customers', id));
}

// ─── Orders ───

export async function getOrders(): Promise<Order[]> {
  const [orderSnap, custSnap, prodSnap, catSnap, colSnap] = await Promise.all([
    getDocs(collection(db, 'orders')),
    getDocs(collection(db, 'customers')),
    getDocs(collection(db, 'products')),
    getDocs(collection(db, 'categories')),
    getDocs(collection(db, 'collections')),
  ]);

  const customers = custSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Customer));
  const cats = catSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Category));
  const cols = colSnap.docs.map((d) => ({ ...d.data(), id: d.id } as Collection));
  const products = prodSnap.docs.map((d) => {
    const data = d.data() as ProductDoc;
    return {
      ...data,
      id: d.id,
      category: cats.find((c) => c.id === data.categoryId) || { id: '', name: 'Unknown', slug: '', description: '', image: '' },
      collection: cols.find((c) => c.id === data.collectionId),
    } as Product;
  });

  return orderSnap.docs.map((d) => {
    const data = d.data() as OrderDoc;
    return {
      ...data,
      id: d.id,
      customer: customers.find((c) => c.id === data.customerId) || { id: '', name: 'Unknown', email: '', phone: '', address: '', city: '', postalCode: '', country: '', totalOrders: 0, totalSpent: 0, createdAt: '' },
      items: data.items.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId) || { id: '', name: 'Unknown', slug: '', price: 0, description: '', shortDescription: '', images: [], category: { id: '', name: '', slug: '', description: '', image: '' }, sizes: [], colors: [], material: '', careInstructions: [], featured: false, new: false, bestseller: false },
      })) as OrderItem[],
    } as Order;
  });
}

export function onOrdersSnapshot(callback: (orders: Order[]) => void): Unsubscribe {
  // For real-time order updates, we listen to the orders collection
  // and resolve references when data changes
  return onSnapshot(collection(db, 'orders'), async () => {
    const resolved = await getOrders();
    callback(resolved);
  });
}

export async function saveOrder(order: Order): Promise<void> {
  const orderDoc: Omit<OrderDoc, 'id'> = {
    orderNumber: order.orderNumber,
    customerId: order.customer.id,
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    status: order.status,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    createdAt: order.createdAt,
    updatedAt: new Date().toISOString().split('T')[0],
  };
  await setDoc(doc(db, 'orders', order.id), orderDoc);
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (snap.exists()) {
    await setDoc(orderRef, { ...snap.data(), status, updatedAt: new Date().toISOString().split('T')[0] });
  }
}

export async function deleteOrder(id: string): Promise<void> {
  await deleteDoc(doc(db, 'orders', id));
}

// ─── Lucky Wheel Config ───

import { LuckyWheelConfig, WheelSegment, PromoCode } from '@/types';

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: '1', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '2', label: '10% OFF', type: 'discount', value: 10, color: '#D4AF37', textColor: '#000000' },
  { id: '3', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '4', label: 'Free Shipping', type: 'free_shipping', value: 0, color: '#F59E0B', textColor: '#000000' },
  { id: '5', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '6', label: '25% OFF', type: 'discount', value: 25, color: '#D4AF37', textColor: '#000000' },
  { id: '7', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '8', label: 'LKR 200 OFF', type: 'discount', value: 5, color: '#F59E0B', textColor: '#000000' },
  { id: '9', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '10', label: 'LKR 500 OFF', type: 'discount', value: 15, color: '#D4AF37', textColor: '#000000' },
];

export async function getLuckyWheelConfig(): Promise<LuckyWheelConfig> {
  const docRef = doc(db, 'luckyWheelConfig', 'main');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as LuckyWheelConfig;
  }
  const config: Omit<LuckyWheelConfig, 'id'> = {
    segments: DEFAULT_SEGMENTS,
    tryAgainThreshold: 30,
    globalTryAgainCounter: 0,
    maxSpinsPerMonth: 3,
    enabled: true,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(docRef, config);
  return { id: 'main', ...config };
}

export async function saveLuckyWheelConfig(config: Omit<LuckyWheelConfig, 'id'>): Promise<void> {
  const docRef = doc(db, 'luckyWheelConfig', 'main');
  await setDoc(docRef, { ...config, updatedAt: new Date().toISOString() });
}

export async function getPromoCodes(): Promise<PromoCode[]> {
  const snap = await getDocs(collection(db, 'promoCodes'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PromoCode));
}

export async function deletePromoCode(id: string): Promise<void> {
  await deleteDoc(doc(db, 'promoCodes', id));
}
