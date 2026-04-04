'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts, deleteProduct } from '@/lib/firestore';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products);
      setLoading(false);
    }).catch((err) => {
      console.error('Firestore load failed:', err);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[var(--text-muted)]">Loading products...</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category.slug === filterCategory;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryOptions = Array.from(
    new Map(products.map((p) => [p.category.slug, p.category])).values()
  ).map((c) => ({
    value: c.slug,
    label: c.name,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">All Products</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{products.length} products in catalogue</p>
        </div>
        <Link href="/products/new" className="btn-gold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="admin-select w-full sm:w-48"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select w-full sm:w-40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[var(--bg-hover)] overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{product.name}</p>
                        <p className="text-xs text-[var(--text-dim)]">{product.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-[var(--text-secondary)] font-mono">{product.sku}</td>
                  <td>
                    <span className="badge badge-gold">{product.category.name}</span>
                  </td>
                  <td>
                    <div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">LKR {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[var(--text-dim)] line-through ml-2">LKR {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`text-sm font-medium ${
                      (product.stock || 0) > 20 ? 'text-green-400' :
                      (product.stock || 0) > 10 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {product.stock || 0}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      product.status === 'active' ? 'badge-success' :
                      product.status === 'draft' ? 'badge-warning' : 'badge-neutral'
                    }`}>
                      {product.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--border)] transition-colors text-[var(--text-label)] hover:text-gold-400"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 transition-colors text-[var(--text-label)] hover:text-red-400"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[var(--text-dim)] text-sm">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-gradient-gold">{products.length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Total Products</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{products.filter(p => p.status === 'active').length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Active</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{products.filter(p => (p.stock || 0) < 15).length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Low Stock</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-gold-400">{products.filter(p => p.featured).length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Featured</p>
        </div>
      </div>
    </div>
  );
}
