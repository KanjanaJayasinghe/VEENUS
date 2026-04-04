'use client';

import { useState, useEffect } from 'react';
import { getCollections, getProducts, saveCollection, deleteCollection, uploadCollectionImage } from '@/lib/firestore';
import { Collection, Product } from '@/types';

export default function CollectionsPage() {
  const [collectionsList, setCollectionsList] = useState<Collection[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Collection>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '', slug: '', description: '', image: '', season: '', year: '',
  });
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);

  useEffect(() => {
    Promise.all([getCollections(), getProducts()]).then(([cols, data]) => {
      setCollectionsList(cols);
      setProductsList(data.products);
      setLoading(false);
    }).catch((err) => {
      console.error('Firestore load failed:', err);
      setLoading(false);
    });
  }, []);

  const startEdit = (col: Collection) => {
    setEditingId(col.id);
    setEditForm({ ...col });
  };

  const handleSave = async () => {
    if (!editForm.id) return;
    setEditUploading(true);
    try {
      let imageUrl = editForm.image || '';
      if (imageUrl.startsWith('data:')) {
        imageUrl = await uploadCollectionImage(editForm.id, imageUrl);
      }
      const updated = { ...editForm, image: imageUrl } as Collection;
      await saveCollection(updated);
      setCollectionsList((prev) => prev.map((c) => c.id === editForm.id ? { ...c, ...updated } : c));
      setEditingId(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving collection:', err);
      alert('Failed to save collection');
    } finally {
      setEditUploading(false);
    }
  };

  const handleAddCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const colId = 'col-' + Date.now();
      let imageUrl = newCollection.image;
      if (imageUrl.startsWith('data:')) {
        imageUrl = await uploadCollectionImage(colId, imageUrl);
      }
      const newCol: Collection = {
        id: colId,
        name: newCollection.name,
        slug: newCollection.slug,
        description: newCollection.description,
        image: imageUrl,
        season: newCollection.season || undefined,
        year: newCollection.year ? parseInt(newCollection.year) : undefined,
      };
      await saveCollection(newCol);
      setCollectionsList((prev) => [...prev, newCol]);
      setShowAddForm(false);
      setNewCollection({ name: '', slug: '', description: '', image: '', season: '', year: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving collection:', err);
      alert('Failed to save collection');
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewCollection((prev) => ({ ...prev, image: ev.target?.result as string }));
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
    if (!confirm('Delete this collection?')) return;
    await deleteCollection(id);
    setCollectionsList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {loading && (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!loading && (<>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Collections</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage seasonal and themed collections</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-gold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Collection
        </button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-green-400 text-sm">
          ✓ Collection saved successfully!
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddCollection} className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">New Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Name *</label>
              <input
                type="text"
                value={newCollection.name}
                onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                placeholder="Collection name"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Slug</label>
              <input type="text" value={newCollection.slug} onChange={(e) => setNewCollection({ ...newCollection, slug: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Season</label>
              <select
                value={newCollection.season}
                onChange={(e) => setNewCollection({ ...newCollection, season: e.target.value })}
                className="admin-select"
              >
                <option value="">Select Season</option>
                <option value="Spring/Summer">Spring/Summer</option>
                <option value="Fall/Winter">Fall/Winter</option>
                <option value="Resort">Resort</option>
                <option value="Pre-Fall">Pre-Fall</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Year</label>
              <input
                type="number"
                value={newCollection.year}
                onChange={(e) => setNewCollection({ ...newCollection, year: e.target.value })}
                placeholder="2026"
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Description</label>
              <textarea
                value={newCollection.description}
                onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                className="admin-textarea"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Collection Image</label>
              {newCollection.image ? (
                <div className="relative inline-block">
                  <img src={newCollection.image} alt="Preview" className="w-48 h-32 object-cover rounded-lg border border-[var(--border)]" />
                  <button type="button" onClick={() => setNewCollection({ ...newCollection, image: '' })} className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-500">✕</button>
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
              {uploading ? 'Uploading...' : 'Save Collection'}
            </button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collectionsList.map((collection) => {
          const productCount = productsList.filter((p) => p.collection?.id === collection.id).length;
          const isEditing = editingId === collection.id;

          return (
            <div key={collection.id} className="admin-card overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                  <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)]" />
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input type="text" value={editForm.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="admin-input" />
                      <div className="grid grid-cols-2 gap-2">
                        <select value={editForm.season || ''} onChange={(e) => setEditForm({ ...editForm, season: e.target.value })} className="admin-select">
                          <option value="Spring/Summer">Spring/Summer</option>
                          <option value="Fall/Winter">Fall/Winter</option>
                          <option value="Resort">Resort</option>
                          <option value="Pre-Fall">Pre-Fall</option>
                        </select>
                        <input type="number" value={editForm.year || ''} onChange={(e) => setEditForm({ ...editForm, year: parseInt(e.target.value) })} className="admin-input" placeholder="Year" />
                      </div>
                      <textarea value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="admin-textarea" rows={2} />
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
                      <div className="flex items-center gap-2 mb-1">
                        {collection.season && (
                          <span className="badge badge-gold">{collection.season} {collection.year}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{collection.name}</h3>
                      <p className="text-xs text-[var(--text-dim)] font-mono">/{collection.slug}</p>
                      <p className="text-sm text-[var(--text-label)] mt-2 line-clamp-2">{collection.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border-light)]">
                        <span className="text-xs text-[var(--text-dim)]">{productCount} products</span>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(collection)} className="btn-outline text-xs px-3 py-1.5">Edit</button>
                          <button onClick={() => handleDelete(collection.id)} className="btn-danger text-xs px-3 py-1.5">Delete</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </>)}
    </div>
  );
}
