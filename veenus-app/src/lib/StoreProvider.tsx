'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProducts, getCategories, getCollections } from '@/lib/firestore';
import { Product, Category, Collection } from '@/types';

interface StoreData {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  loading: boolean;
}

const StoreContext = createContext<StoreData>({
  products: [],
  categories: [],
  collections: [],
  loading: true,
});

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>({
    products: [],
    categories: [],
    collections: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([getProducts(), getCategories(), getCollections()]).then(
      ([products, categories, collections]) => {
        setData({ products, categories, collections, loading: false });
      }
    );
  }, []);

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
