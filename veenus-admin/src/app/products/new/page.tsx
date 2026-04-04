'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategories, getCollections, saveProduct, uploadProductImages } from '@/lib/firestore';
import { Category, Collection } from '@/types';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    originalPrice: '',
    shortDescription: '',
    description: '',
    category: '',
    collection: '',
    material: '',
    sku: '',
    stock: '',
    sizes: [] as string[],
    colors: [{ name: '', hex: '#000000' }],
    careInstructions: [''],
    images: [] as string[],
    featured: false,
    new: false,
    bestseller: false,
    status: 'draft' as 'active' | 'draft' | 'archived',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([getCategories(), getCollections()]).then(([cats, cols]) => {
      setCategories(cats);
      setCollections(cols);
      setLoadingData(false);
    });
  }, []);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', 'Adjustable'];

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'name'
        ? { slug: (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
        : {}),
    }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: '', hex: '#000000' }],
    }));
  };

  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const addCareInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      careInstructions: [...prev.careInstructions, ''],
    }));
  };

  const updateCareInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      careInstructions: prev.careInstructions.map((c, i) => (i === index ? value : c)),
    }));
  };

  const removeCareInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      careInstructions: prev.careInstructions.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 5 - formData.images.length;
    if (remaining <= 0) { e.target.value = ''; return; }
    Array.from(files).slice(0, remaining).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setFormData((prev) => {
          if (prev.images.length >= 5) return prev;
          return { ...prev, images: [...prev.images, result] };
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const category = categories.find((c) => c.id === formData.category);
      const col = collections.find((c) => c.id === formData.collection);
      const productId = 'prod-' + Date.now();
      const imageUrls = await uploadProductImages(productId, formData.images);
      await saveProduct({
        id: productId,
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        shortDescription: formData.shortDescription,
        images: imageUrls,
        category: category || { id: '', name: '', slug: '', description: '', image: '' },
        collection: col,
        sizes: formData.sizes,
        colors: formData.colors,
        material: formData.material,
        careInstructions: formData.careInstructions.filter(Boolean),
        featured: formData.featured,
        new: formData.new,
        bestseller: formData.bestseller,
        stock: parseInt(formData.stock) || 0,
        sku: formData.sku,
        status: formData.status,
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.push('/products');
      }, 1500);
    } catch (err: unknown) {
      console.error('Error saving product:', err);
      const msg = err instanceof Error ? err.message : String(err);
      alert('Failed to save product: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Add New Product</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Create a new product for the Veenus catalogue</p>
        </div>
        <button onClick={() => router.push('/products')} className="btn-outline">
          ← Back to Products
        </button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-green-400 text-sm">
          ✓ Product saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Silk Evening Gown"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="admin-input"
                placeholder="auto-generated"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
                placeholder="e.g., VN-DRS-013"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleChange('material', e.target.value)}
                placeholder="e.g., 100% Mulberry Silk"
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Short Description *</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                placeholder="Brief product tagline"
                className="admin-input"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Full Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Detailed product description..."
                className="admin-textarea"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Price (LKR) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
                className="admin-input"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Original Price (LKR)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                placeholder="Leave blank for no discount"
                className="admin-input"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                placeholder="0"
                className="admin-input"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="admin-select"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Collection</label>
              <select
                value={formData.collection}
                onChange={(e) => handleChange('collection', e.target.value)}
                className="admin-select"
              >
                <option value="">No Collection</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>{col.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="admin-select"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-[var(--border-light)]">
            {(['featured', 'new', 'bestseller'] as const).map((flag) => (
              <label key={flag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[flag]}
                  onChange={(e) => handleChange(flag, e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--border-hover)] bg-[var(--bg-input)] text-gold-500 focus:ring-gold-500"
                />
                <span className="text-sm text-[var(--text-secondary)] capitalize">{flag === 'new' ? 'New Arrival' : flag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Available Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  formData.sizes.includes(size)
                    ? 'bg-gold-800/20 text-gold-300 border-gold-700/30'
                    : 'bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-hover)]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Colors</h3>
            <button type="button" onClick={addColor} className="btn-outline text-xs px-3 py-1.5">
              + Add Color
            </button>
          </div>
          <div className="space-y-3">
            {formData.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateColor(index, 'hex', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={color.name}
                  onChange={(e) => updateColor(index, 'name', e.target.value)}
                  placeholder="Color name (e.g., Midnight Blue)"
                  className="admin-input flex-1"
                />
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => updateColor(index, 'hex', e.target.value)}
                  placeholder="#000000"
                  className="admin-input w-28"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[var(--text-dim)] hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Product Images</h3>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">{formData.images.length}/5 images • Auto-compressed for fast loading</p>
            </div>
            {formData.images.length < 5 && (
            <label className="btn-outline text-xs px-3 py-1.5 cursor-pointer">
              + Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            )}
          </div>
          {formData.images.length === 0 ? (
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[var(--border-hover)] rounded-lg cursor-pointer hover:border-gold-500/50 transition-colors">
              <svg className="w-10 h-10 text-[var(--text-dim)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-[var(--text-dim)]">Click to upload images</span>
              <span className="text-xs text-[var(--text-faint)] mt-1">PNG, JPG, WEBP supported</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group aspect-square rounded-lg bg-[var(--bg-hover)] overflow-hidden border border-[var(--border)]">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-[var(--text-secondary)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {formData.images.length < 5 && (
              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[var(--border-hover)] rounded-lg cursor-pointer hover:border-gold-500/50 transition-colors">
                <svg className="w-8 h-8 text-[var(--text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-[var(--text-dim)] mt-1">Add more</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              )}
            </div>
          )}
        </div>

        {/* Care Instructions */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Care Instructions</h3>
            <button type="button" onClick={addCareInstruction} className="btn-outline text-xs px-3 py-1.5">
              + Add Instruction
            </button>
          </div>
          <div className="space-y-3">
            {formData.careInstructions.map((inst, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inst}
                  onChange={(e) => updateCareInstruction(index, e.target.value)}
                  placeholder="e.g., Dry clean only"
                  className="admin-input flex-1"
                />
                {formData.careInstructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCareInstruction(index)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[var(--text-dim)] hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-gold px-8" disabled={saving}>
            {saving ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" onClick={() => router.push('/products')} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
