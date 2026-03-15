'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
          <h2 className="text-xl font-semibold text-[#e5e5e5]">All Products</h2>
          <p className="text-sm text-[#666] mt-0.5">{products.length} products in catalogue</p>
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
            className="admin-select w-48"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select w-40"
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
                      <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#e5e5e5]">{product.name}</p>
                        <p className="text-xs text-[#555]">{product.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-[#999] font-mono">{product.sku}</td>
                  <td>
                    <span className="badge badge-gold">{product.category.name}</span>
                  </td>
                  <td>
                    <div>
                      <span className="text-sm font-medium text-[#e5e5e5]">€{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#555] line-through ml-2">€{product.originalPrice.toLocaleString()}</span>
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
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#222] transition-colors text-[#888] hover:text-gold-400"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 transition-colors text-[#888] hover:text-red-400"
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
            <p className="text-[#555] text-sm">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-gradient-gold">{products.length}</p>
          <p className="text-xs text-[#666] mt-1">Total Products</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{products.filter(p => p.status === 'active').length}</p>
          <p className="text-xs text-[#666] mt-1">Active</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{products.filter(p => (p.stock || 0) < 15).length}</p>
          <p className="text-xs text-[#666] mt-1">Low Stock</p>
        </div>
        <div className="admin-card p-4 text-center">
          <p className="text-2xl font-bold text-gold-400">{products.filter(p => p.featured).length}</p>
          <p className="text-xs text-[#666] mt-1">Featured</p>
        </div>
      </div>
    </div>
  );
}
