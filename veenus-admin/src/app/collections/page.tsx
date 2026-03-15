'use client';

import { useState } from 'react';
import { collections, products } from '@/data';
import { Collection } from '@/types';

export default function CollectionsPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Collection>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '', slug: '', description: '', image: '', season: '', year: '',
  });
  const [saved, setSaved] = useState(false);

  const startEdit = (col: Collection) => {
    setEditingId(col.id);
    setEditForm({ ...col });
  };

  const handleSave = () => {
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
    setNewCollection({ name: '', slug: '', description: '', image: '', season: '', year: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#e5e5e5]">Collections</h2>
          <p className="text-sm text-[#666] mt-0.5">Manage seasonal and themed collections</p>
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
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">New Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Name *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Slug</label>
              <input type="text" value={newCollection.slug} onChange={(e) => setNewCollection({ ...newCollection, slug: e.target.value })} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Season</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Year</label>
              <input
                type="number"
                value={newCollection.year}
                onChange={(e) => setNewCollection({ ...newCollection, year: e.target.value })}
                placeholder="2026"
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#999] mb-1.5">Description</label>
              <textarea
                value={newCollection.description}
                onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                className="admin-textarea"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#999] mb-1.5">Image URL</label>
              <input type="url" value={newCollection.image} onChange={(e) => setNewCollection({ ...newCollection, image: e.target.value })} placeholder="https://..." className="admin-input" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn-gold">Save Collection</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => {
          const productCount = products.filter((p) => p.collection?.id === collection.id).length;
          const isEditing = editingId === collection.id;

          return (
            <div key={collection.id} className="admin-card overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="relative w-48 flex-shrink-0">
                  <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#161616]" />
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
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn-gold text-xs px-3 py-1.5">Save</button>
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
                      <h3 className="text-lg font-semibold text-[#e5e5e5]">{collection.name}</h3>
                      <p className="text-xs text-[#555] font-mono">/{collection.slug}</p>
                      <p className="text-sm text-[#888] mt-2 line-clamp-2">{collection.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1a1a1a]">
                        <span className="text-xs text-[#555]">{productCount} products</span>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(collection)} className="btn-outline text-xs px-3 py-1.5">Edit</button>
                          <button className="btn-danger text-xs px-3 py-1.5">Delete</button>
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
    </div>
  );
}
