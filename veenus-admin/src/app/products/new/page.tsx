'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories, collections } from '@/data';

export default function NewProductPage() {
  const router = useRouter();
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
    images: [''],
    featured: false,
    new: false,
    bestseller: false,
    status: 'draft' as 'active' | 'draft' | 'archived',
  });
  const [saved, setSaved] = useState(false);

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

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#e5e5e5]">Add New Product</h2>
          <p className="text-sm text-[#666] mt-0.5">Create a new product for the Veenus catalogue</p>
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
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Product Name *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="admin-input"
                placeholder="auto-generated"
              />
            </div>
            <div>
              <label className="block text-sm text-[#999] mb-1.5">SKU *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleChange('material', e.target.value)}
                placeholder="e.g., 100% Mulberry Silk"
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#999] mb-1.5">Short Description *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Full Description</label>
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
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Price (€) *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Original Price (€)</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Stock Quantity *</label>
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
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#999] mb-1.5">Category *</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Collection</label>
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
              <label className="block text-sm text-[#999] mb-1.5">Status</label>
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
          <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-[#1a1a1a]">
            {(['featured', 'new', 'bestseller'] as const).map((flag) => (
              <label key={flag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[flag]}
                  onChange={(e) => handleChange(flag, e.target.checked)}
                  className="w-4 h-4 rounded border-[#333] bg-[#0f0f0f] text-gold-500 focus:ring-gold-500"
                />
                <span className="text-sm text-[#999] capitalize">{flag === 'new' ? 'New Arrival' : flag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[#e5e5e5] mb-4">Available Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  formData.sizes.includes(size)
                    ? 'bg-gold-800/20 text-gold-300 border-gold-700/30'
                    : 'bg-[#0f0f0f] text-[#666] border-[#222] hover:border-[#333]'
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
            <h3 className="text-base font-semibold text-[#e5e5e5]">Colors</h3>
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
                  className="w-10 h-10 rounded-lg border border-[#222] cursor-pointer bg-transparent"
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
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#555] hover:text-red-400 transition-colors"
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
            <h3 className="text-base font-semibold text-[#e5e5e5]">Product Images</h3>
            <button type="button" onClick={addImage} className="btn-outline text-xs px-3 py-1.5">
              + Add Image URL
            </button>
          </div>
          <div className="space-y-3">
            {formData.images.map((img, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] overflow-hidden flex-shrink-0 border border-[#222]">
                  {img && <img src={img} alt="" className="w-full h-full object-cover" />}
                </div>
                <input
                  type="url"
                  value={img}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="Image URL"
                  className="admin-input flex-1"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#555] hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Care Instructions */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#e5e5e5]">Care Instructions</h3>
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
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#555] hover:text-red-400 transition-colors"
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
          <button type="submit" className="btn-gold px-8">
            Save Product
          </button>
          <button type="button" onClick={() => router.push('/products')} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
