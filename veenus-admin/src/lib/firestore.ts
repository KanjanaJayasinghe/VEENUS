import { db } from './firebase';
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
import { Product, Category, Collection, Customer, Order, OrderItem, ProductColor } from '@/types';

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
  const productDoc: Omit<ProductDoc, 'id'> = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
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
    stock: product.stock,
    sku: product.sku,
    status: product.status || 'active',
    createdAt: product.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
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
