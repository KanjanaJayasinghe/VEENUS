'use client';

import { useState, useEffect } from 'react';
import { getCategories, getProducts, saveCategory, deleteCategory, uploadCategoryImage } from '@/lib/firestore';
import { Category, Product } from '@/types';

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '', image: '' });
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(([cats, data]) => {
      setCategoriesList(cats);
      setProductsList(data.products);
      setLoading(false);
    }).catch((err) => {
      console.error('Firestore load failed:', err);
      setLoading(false);
    });
  }, []);

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ ...cat });
  };

  const handleSave = async () => {
    if (!editForm.id) return;
    setEditUploading(true);
    try {
      let imageUrl = editForm.image || '';
      if (imageUrl.startsWith('data:')) {
        imageUrl = await uploadCategoryImage(editForm.id, imageUrl);
      }
      const updated = { ...editForm, image: imageUrl } as Category;
      await saveCategory(updated);
      setCategoriesList((prev) => prev.map((c) => c.id === editForm.id ? { ...c, ...updated } : c));
      setEditingId(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving category:', err);
      alert('Failed to save category');
    } finally {
      setEditUploading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const catId = 'cat-' + Date.now();
      let imageUrl = newCategory.image;
      if (imageUrl.startsWith('data:')) {
        imageUrl = await uploadCategoryImage(catId, imageUrl);
      }
      const newCat: Category = {
        id: catId,
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description,
        image: imageUrl,
      };
      await saveCategory(newCat);
      setCategoriesList((prev) => [...prev, newCat]);
      setShowAddForm(false);
      setNewCategory({ name: '', slug: '', description: '', image: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving category:', err);
      alert('Failed to save category');
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewCategory((prev) => ({ ...prev, image: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleEditImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm((prev) => ({ ...prev, image: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await deleteCategory(id);
    setCategoriesList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!loading && (
      <>{/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Categories</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage product categories</p>
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
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Name *</label>
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
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Slug</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Description</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Category description"
                className="admin-textarea"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Category Image</label>
              {newCategory.image ? (
                <div className="relative inline-block">
                  <img src={newCategory.image} alt="Preview" className="w-48 h-32 object-cover rounded-lg border border-[var(--border)]" />
                  <button type="button" onClick={() => setNewCategory({ ...newCategory, image: '' })} className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-500">✕</button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[var(--border-hover)] rounded-lg cursor-pointer hover:border-gold-500/50 transition-colors">
                  <svg className="w-8 h-8 text-[var(--text-dim)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-xs text-[var(--text-dim)]">Click to upload image</span>
                  <span className="text-[10px] text-[var(--text-faint)] mt-0.5">PNG, JPG, WEBP • Auto-compressed</span>
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </label>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn-gold" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Save Category'}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((category) => {
          const productCount = productsList.filter((p) => p.category.id === category.id).length;
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
                    <div>
                      <label className="block text-xs text-[var(--text-dim)] mb-1">Change Image</label>
                      {editForm.image && editForm.image.startsWith('data:') ? (
                        <div className="relative inline-block">
                          <img src={editForm.image} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-[var(--border)]" />
                          <button type="button" onClick={() => setEditForm({ ...editForm, image: '' })} className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] hover:bg-red-500">✕</button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-[var(--border-hover)] rounded-lg cursor-pointer hover:border-gold-500/50 transition-colors text-xs text-[var(--text-dim)]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          Upload new image
                          <input type="file" accept="image/*" onChange={handleEditImageSelect} className="hidden" />
                        </label>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="btn-gold text-xs px-3 py-1.5" disabled={editUploading}>
                        {editUploading ? 'Uploading...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingId(null)} className="btn-outline text-xs px-3 py-1.5">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{category.name}</h3>
                    <p className="text-xs text-[var(--text-dim)] font-mono mt-0.5">/{category.slug}</p>
                    <p className="text-sm text-[var(--text-label)] mt-2 line-clamp-2">{category.description}</p>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--border-light)]">
                      <button onClick={() => startEdit(category)} className="btn-outline text-xs px-3 py-1.5">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="btn-danger text-xs px-3 py-1.5">
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
      </>
      )}
    </div>
  );
}
