'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories, collections, products, customers, orders } from '@/data';
import {
  saveCategory,
  saveCollection,
  saveProduct,
  saveCustomer,
  saveOrder,
} from '@/lib/firestore';

type SeedStatus = 'idle' | 'seeding' | 'done' | 'error';

interface StepStatus {
  label: string;
  count: number;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
}

export default function SeedPage() {
  const [seedStatus, setSeedStatus] = useState<SeedStatus>('idle');
  const [steps, setSteps] = useState<StepStatus[]>([
    { label: 'Categories', count: categories.length, status: 'pending' },
    { label: 'Collections', count: collections.length, status: 'pending' },
    { label: 'Products', count: products.length, status: 'pending' },
    { label: 'Customers', count: customers.length, status: 'pending' },
    { label: 'Orders', count: orders.length, status: 'pending' },
  ]);

  const updateStep = (index: number, update: Partial<StepStatus>) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...update } : s)));
  };

  const handleSeedAll = async () => {
    setSeedStatus('seeding');

    // Step 0: Categories
    updateStep(0, { status: 'running' });
    try {
      await Promise.all(categories.map((c) => saveCategory(c)));
      updateStep(0, { status: 'done' });
    } catch (e) {
      updateStep(0, { status: 'error', error: String(e) });
      setSeedStatus('error');
      return;
    }

    // Step 1: Collections
    updateStep(1, { status: 'running' });
    try {
      await Promise.all(collections.map((c) => saveCollection(c)));
      updateStep(1, { status: 'done' });
    } catch (e) {
      updateStep(1, { status: 'error', error: String(e) });
      setSeedStatus('error');
      return;
    }

    // Step 2: Products
    updateStep(2, { status: 'running' });
    try {
      await Promise.all(products.map((p) => saveProduct(p)));
      updateStep(2, { status: 'done' });
    } catch (e) {
      updateStep(2, { status: 'error', error: String(e) });
      setSeedStatus('error');
      return;
    }

    // Step 3: Customers
    updateStep(3, { status: 'running' });
    try {
      await Promise.all(customers.map((c) => saveCustomer(c)));
      updateStep(3, { status: 'done' });
    } catch (e) {
      updateStep(3, { status: 'error', error: String(e) });
      setSeedStatus('error');
      return;
    }

    // Step 4: Orders
    updateStep(4, { status: 'running' });
    try {
      await Promise.all(orders.map((o) => saveOrder(o)));
      updateStep(4, { status: 'done' });
    } catch (e) {
      updateStep(4, { status: 'error', error: String(e) });
      setSeedStatus('error');
      return;
    }

    setSeedStatus('done');
  };

  const statusIcon = (status: StepStatus['status']) => {
    if (status === 'pending') return <span className="text-gray-400">○</span>;
    if (status === 'running') return <span className="text-blue-400 animate-spin inline-block">◌</span>;
    if (status === 'done') return <span className="text-green-400">✓</span>;
    if (status === 'error') return <span className="text-red-400">✗</span>;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Seed Firestore Data</h1>
        <p className="text-gray-400 mb-8">
          Upload all sample data (categories, collections, products, customers, orders) to Firestore.
          Run this once to initialize the database.
        </p>

        {/* Steps */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8 space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl w-6 text-center">{statusIcon(step.status)}</span>
                <span className={step.status === 'done' ? 'text-white' : 'text-gray-400'}>
                  {step.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">{step.count} records</span>
                {step.error && (
                  <span className="text-red-400 text-xs max-w-[200px] truncate">{step.error}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {seedStatus === 'done' && (
          <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 mb-6 text-green-400 text-sm">
            ✓ All data seeded successfully! Your Firestore database is now populated.
          </div>
        )}
        {seedStatus === 'error' && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-6 text-red-400 text-sm">
            ✗ Seeding failed. Check the step above for details. Make sure Firestore is enabled in your Firebase Console.
          </div>
        )}

        <button
          onClick={handleSeedAll}
          disabled={seedStatus === 'seeding' || seedStatus === 'done'}
          className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {seedStatus === 'seeding' ? 'Seeding...' : seedStatus === 'done' ? 'Done ✓' : 'Seed All Data'}
        </button>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Re-running seed will overwrite existing data with the same IDs.
        </p>
      </div>
    </div>
  );
}
