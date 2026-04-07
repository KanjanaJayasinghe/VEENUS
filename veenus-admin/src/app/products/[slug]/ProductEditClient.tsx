'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, saveProduct, deleteProduct, uploadProductImages } from '@/lib/firestore';
import { Product, Category, Collection } from '@/types';

function hexToColorName(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const names: [number, number, number, string][] = [
    [0,0,0,'Black'],[255,255,255,'White'],[255,0,0,'Red'],[0,128,0,'Green'],[0,0,255,'Blue'],
    [255,255,0,'Yellow'],[255,165,0,'Orange'],[128,0,128,'Purple'],[255,192,203,'Pink'],
    [165,42,42,'Brown'],[128,128,128,'Gray'],[0,128,128,'Teal'],[0,0,128,'Navy'],
    [128,0,0,'Maroon'],[0,255,255,'Cyan'],[255,215,0,'Gold'],[192,192,192,'Silver'],
    [245,245,220,'Beige'],[75,0,130,'Indigo'],[255,127,80,'Coral'],[240,128,128,'Light Coral'],
    [0,100,0,'Dark Green'],[139,0,0,'Dark Red'],[70,130,180,'Steel Blue'],[188,143,143,'Rosy Brown'],
  ];
  let closest = 'Custom';
  let minDist = Infinity;
  for (const [cr, cg, cb, name] of names) {
    const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
    if (dist < minDist) { minDist = dist; closest = name; }
  }
  return closest;
}

export default function ProductEditClient({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
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
    status: 'active' as 'active' | 'draft' | 'archived',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      setCategories(data.categories);
      setCollections(data.collections);
      const found = data.products.find((p) => p.slug === params.slug);
      if (found) {
        setProduct(found);
        setFormData({
          name: found.name,
          slug: found.slug,
          price: found.price.toString(),
          originalPrice: found.originalPrice?.toString() || '',
          shortDescription: found.shortDescription,
          description: found.description,
          category: found.category.id,
          collection: found.collection?.id || '',
          material: found.material,
          sku: found.sku || '',
          stock: found.stock?.toString() || '',
          sizes: found.sizes,
          colors: found.colors.length > 0 ? found.colors : [{ name: '', hex: '#000000' }],
          careInstructions: found.careInstructions.length > 0 ? found.careInstructions : [''],
          images: found.images,
          featured: found.featured,
          new: found.new,
          bestseller: found.bestseller,
          status: (found.status || 'active') as 'active' | 'draft' | 'archived',
        });
      }
      setLoading(false);
    });
  }, [params.slug]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', 'Adjustable'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[var(--text-muted)]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-[var(--text-dim)] text-lg mb-4">Product not found</p>
          <button onClick={() => router.push('/products')} className="btn-gold">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    setFormData((prev) => ({ ...prev, colors: [...prev.colors, { name: '', hex: '#000000' }] }));
  };

  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
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
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const category = categories.find((c) => c.id === formData.category);
      const col = collections.find((c) => c.id === formData.collection);
      const imageUrls = await uploadProductImages(product!.id, formData.images);
      await saveProduct({
        id: product!.id,
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        shortDescription: formData.shortDescription,
        images: imageUrls,
        category: category || product!.category,
        collection: col,
        sizes: formData.sizes,
        colors: formData.colors.map(c => ({ name: c.name || hexToColorName(c.hex), hex: c.hex })),
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
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      console.error('Error updating product:', err);
      const msg = err instanceof Error ? err.message : String(err);
      alert('Failed to update product: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Edit Product</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{product.name}</p>
        </div>
        <button onClick={() => router.push('/products')} className="btn-outline">
          ← Back to Products
        </button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-green-400 text-sm">
          ✓ Product updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Product Name *</label>
              <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="admin-input" required />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">SKU</label>
              <input type="text" value={formData.sku} onChange={(e) => handleChange('sku', e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Material</label>
              <input type="text" value={formData.material} onChange={(e) => handleChange('material', e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => handleChange('slug', e.target.value)} className="admin-input" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Short Description</label>
              <input type="text" value={formData.shortDescription} onChange={(e) => handleChange('shortDescription', e.target.value)} className="admin-input" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Full Description</label>
              <textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="admin-textarea" rows={4} />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Price (LKR) *</label>
              <input type="number" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} className="admin-input" min="0" step="0.01" required />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Original Price (LKR)</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => handleChange('originalPrice', e.target.value)} className="admin-input" min="0" step="0.01" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Stock *</label>
              <input type="number" value={formData.stock} onChange={(e) => handleChange('stock', e.target.value)} className="admin-input" min="0" required />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Category</label>
              <select value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="admin-select">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Collection</label>
              <select value={formData.collection} onChange={(e) => handleChange('collection', e.target.value)} className="admin-select">
                <option value="">No Collection</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>{col.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Status</label>
              <select value={formData.status} onChange={(e) => handleChange('status', e.target.value)} className="admin-select">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
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
            <button type="button" onClick={addColor} className="btn-outline text-xs px-3 py-1.5">+ Add Color</button>
          </div>
          <div className="space-y-3">
            {formData.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-3">
                <input type="color" value={color.hex} onChange={(e) => updateColor(index, 'hex', e.target.value)} className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent" />
                <input type="text" value={color.name} onChange={(e) => updateColor(index, 'name', e.target.value)} placeholder="Color name" className="admin-input flex-1" />
                <input type="text" value={color.hex} onChange={(e) => updateColor(index, 'hex', e.target.value)} className="admin-input w-28" />
                {formData.colors.length > 1 && (
                  <button type="button" onClick={() => removeColor(index)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[var(--text-dim)] hover:text-red-400">✕</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Images */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Product Images</h3>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">{formData.images.length}/5 images • Auto-compressed for fast loading</p>
            </div>
            {formData.images.length < 5 && (
            <label className="btn-outline text-xs px-3 py-1.5 cursor-pointer">
              + Upload Images
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
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
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
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
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-gold px-8" disabled={saving}>{saving ? 'Saving...' : 'Update Product'}</button>
          <button type="button" onClick={() => router.push('/products')} className="btn-outline">Cancel</button>
          <button type="button" className="btn-danger ml-auto" onClick={async () => {
            if (!confirm('Delete this product?')) return;
            await deleteProduct(product!.id);
            router.push('/products');
          }}>Delete Product</button>
        </div>
      </form>
    </div>
  );
}
