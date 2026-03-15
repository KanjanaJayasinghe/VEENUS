'use client';

import { useState } from 'react';
import { categories, products } from '@/data';
import { Category } from '@/types';

export default function CategoriesPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '', image: '' });
  const [saved, setSaved] = useState(false);

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ ...cat });
  };

  const handleSave = () => {
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    setNewCategory({ name: '', slug: '', description: '', image: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#e5e5e5]">Categories</h2>
          <p className="text-sm text-[#666] mt-0.5">Manage product categories</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-gold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-green-400 text-sm">
          ✓ Category saved successfully!
        </div>
      )}

      {/* Add Category Form */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="admin-card p-6">
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Name *</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                placeholder="Category name"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Slug</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#999] mb-1.5">Description</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Category description"
                className="admin-textarea"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#999] mb-1.5">Image URL</label>
              <input
                type="url"
                value={newCategory.image}
                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                placeholder="https://..."
                className="admin-input"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn-gold">Save Category</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const productCount = products.filter((p) => p.category.id === category.id).length;
          const isEditing = editingId === category.id;

          return (
            <div key={category.id} className="admin-card overflow-hidden">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="badge badge-gold">{productCount} products</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="admin-input"
                    />
                    <input
                      type="text"
                      value={editForm.slug || ''}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="admin-input"
                      placeholder="slug"
                    />
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="admin-textarea"
                      rows={2}
                    />
                    <input
                      type="url"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                      className="admin-input"
                      placeholder="Image URL"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="btn-gold text-xs px-3 py-1.5">Save</button>
                      <button onClick={() => setEditingId(null)} className="btn-outline text-xs px-3 py-1.5">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-[#e5e5e5]">{category.name}</h3>
                    <p className="text-xs text-[#555] font-mono mt-0.5">/{category.slug}</p>
                    <p className="text-sm text-[#888] mt-2 line-clamp-2">{category.description}</p>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1a1a1a]">
                      <button onClick={() => startEdit(category)} className="btn-outline text-xs px-3 py-1.5">
                        Edit
                      </button>
                      <button className="btn-danger text-xs px-3 py-1.5">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
