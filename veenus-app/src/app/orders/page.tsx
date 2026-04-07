'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/StoreProvider';
import { validatePromoCode, markPromoCodeUsed } from '@/lib/luckyWheel';
import { getShippingSettings, placeOrder, uploadBankSlip, updateOrderBankSlip, updateProductStock } from '@/lib/firestore';
import { PromoCode, PaymentMethod, ShippingSettings, OrderItemData } from '@/types';

interface OrderItem {
  productId: string;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
}

export default function OrdersPage() {
  const { products, loading: storeLoading } = useStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stockError, setStockError] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);

  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>({ sriLanka: 500, netherlands: 1500 });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [bankSlipFile, setBankSlipFile] = useState<File | null>(null);
  const [bankSlipPreview, setBankSlipPreview] = useState('');

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  const currentProduct = products.find((p) => p.id === selectedProduct);

  // Load shipping settings
  useEffect(() => {
    getShippingSettings().then(setShippingSettings).catch(console.error);
  }, []);

  // Read URL params and auto-add item from product page
  useEffect(() => {
    if (storeLoading || urlParamsProcessed || products.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    const size = params.get('size');
    const color = params.get('color');
    const qty = params.get('quantity');

    if (productId && size && color) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        const colorObj = product.colors.find((c) => c.name === color || c.hex === color);
        const maxQty = product.stock ?? 10;
        const parsedQty = qty ? Math.min(Math.max(parseInt(qty, 10) || 1, 1), maxQty) : 1;
        setOrderItems([{
          productId,
          size,
          color: colorObj?.name || colorObj?.hex || color,
          colorHex: colorObj?.hex || '#000',
          quantity: parsedQty,
        }]);
      }
    }
    setUrlParamsProcessed(true);
  }, [storeLoading, products, urlParamsProcessed]);

  const getShippingCost = () => {
    if (!formData.country || orderItems.length === 0) return 0;
    if (appliedPromo?.type === 'free_shipping') return 0;
    return formData.country === 'LK' ? shippingSettings.sriLanka : shippingSettings.netherlands;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) return;
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    // Stock validation
    if (product.stock !== undefined && product.stock !== null) {
      const existingQty = orderItems
        .filter((item) => item.productId === selectedProduct)
        .reduce((sum, item) => sum + item.quantity, 0);
      if (existingQty + quantity > product.stock) {
        setStockError(`Only ${Math.max(0, product.stock - existingQty)} item(s) available in stock.`);
        return;
      }
    }

    setStockError('');
    const colorObj = product.colors.find((c) => (c.name || c.hex) === selectedColor);
    setOrderItems([
      ...orderItems,
      {
        productId: selectedProduct,
        size: selectedSize,
        color: colorObj?.name || colorObj?.hex || selectedColor,
        colorHex: colorObj?.hex || '#000',
        quantity,
      },
    ]);
    setSelectedProduct('');
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const getSubtotal = () => {
    return orderItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getDiscount = () => {
    if (!appliedPromo || appliedPromo.type !== 'discount') return 0;
    return Math.round(getSubtotal() * (appliedPromo.value / 100));
  };

  const getFinalTotal = () => {
    return getSubtotal() - getDiscount() + getShippingCost();
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoError('');
    setPromoLoading(true);
    try {
      const promo = await validatePromoCode(promoInput);
      if (!promo) {
        setPromoError('Invalid or expired promo code.');
        setAppliedPromo(null);
      } else {
        setAppliedPromo(promo);
        setPromoError('');
      }
    } catch {
      setPromoError('Failed to validate promo code.');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const handleBankSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setOrderError('Bank slip image must be under 5MB.');
        return;
      }
      setBankSlipFile(file);
      const reader = new FileReader();
      reader.onload = () => setBankSlipPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) return;

    if (paymentMethod === 'bank_transfer' && !bankSlipFile) {
      setOrderError('Please upload your bank transfer slip.');
      return;
    }

    setOrderLoading(true);
    setOrderError('');

    try {
      const items: OrderItemData[] = orderItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          productName: product?.name || 'Unknown',
          size: item.size,
          color: { name: item.color, hex: item.colorHex },
          quantity: item.quantity,
          price: (product?.price || 0) * item.quantity,
        };
      });

      const subtotal = getSubtotal();
      const discount = getDiscount();
      const shipping = getShippingCost();
      const total = subtotal - discount + shipping;

      const result = await placeOrder({
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items,
        subtotal,
        shipping,
        discount,
        total,
        paymentMethod,
        promoCode: appliedPromo?.code,
        notes: formData.notes,
      });

      // Upload bank slip if provided
      if (paymentMethod === 'bank_transfer' && bankSlipFile) {
        try {
          const slipUrl = await uploadBankSlip(result.orderId, bankSlipFile);
          await updateOrderBankSlip(result.orderId, slipUrl);
        } catch {
          // Order is placed, slip upload is non-fatal
        }
      }

      // Mark promo as used
      if (appliedPromo) {
        try { await markPromoCodeUsed(appliedPromo.code); } catch { /* ignore */ }
      }

      // Deduct stock for each item
      for (const item of orderItems) {
        try { await updateProductStock(item.productId, -item.quantity); } catch { /* ignore */ }
      }

      setOrderTotal(total);
      setOrderNumber(result.orderNumber);
      setOrderPlaced(true);
    } catch (err) {
      console.error('Order placement failed:', err);
      setOrderError('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (storeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-luxury-cream/40 tracking-widest text-sm uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <section className="pt-28 sm:pt-36 md:pt-40 pb-20 relative min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-gold-500 flex items-center justify-center">
              <svg className="w-12 h-12 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-luxury-cream mb-6">
              Order <span className="text-gradient-gold">Placed</span>
            </h1>
            <p className="text-luxury-cream/40 text-lg mb-4 leading-relaxed">
              Thank you for your order! We have received your request and will contact you shortly to confirm the details.
            </p>
            <p className="text-gold-400 text-lg font-semibold mb-2">
              Order Reference: {orderNumber}
            </p>
            {paymentMethod === 'bank_transfer' && (
              <p className="text-luxury-cream/30 text-sm mb-6">
                Your bank transfer slip has been received. We will verify the payment and update your order status.
              </p>
            )}
            {paymentMethod === 'cod' && (
              <p className="text-luxury-cream/30 text-sm mb-6">
                Please prepare {formatPrice(orderTotal)} for cash on delivery.
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/categories" className="btn-primary">
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  setOrderItems([]);
                  setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '', notes: '' });
                  setPaymentMethod('cod');
                  setBankSlipFile(null);
                  setBankSlipPreview('');
                  setAppliedPromo(null);
                  setPromoInput('');
                  setOrderNumber('');
                  setOrderTotal(0);
                }}
                className="btn-outline"
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header Section */}
      <section className="pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-12 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="container-luxury relative">
          <nav className="mb-8">
            <ol className="flex items-center gap-3 text-xs tracking-wider">
              <li><Link href="/" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">Home</Link></li>
              <li className="text-gold-800/30">/</li>
              <li className="text-gold-400">Orders</li>
            </ol>
          </nav>

          <div className="text-center mb-8">
            <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em] mb-5">Place Your Order</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-luxury-cream mb-6">
              Order <span className="text-gradient-gold">Now</span>
            </h1>
            <div className="divider-gold" />
            <p className="text-luxury-cream/40 max-w-2xl mx-auto mt-6 leading-relaxed">
              Select your desired pieces, choose your preferences, and provide your details. Our team will process your order with the utmost care.
            </p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="pb-20 sm:pb-28 relative">
        <div className="container-luxury">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">

                {/* Step 1: Select Items */}
                <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-luxury-black" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }}>1</div>
                    <h2 className="font-display text-xl sm:text-2xl text-luxury-cream">Select <span className="text-gradient-gold">Items</span></h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Product</label>
                      <select
                        value={selectedProduct}
                        onChange={(e) => { setSelectedProduct(e.target.value); setSelectedSize(''); setSelectedColor(''); setStockError(''); }}
                        className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream/80 px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="">Choose a product...</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} — {formatPrice(product.price)}{product.stock !== undefined ? ` (${product.stock} in stock)` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {currentProduct && (
                      <>
                        {/* Product Preview */}
                        <div className="flex gap-4 p-4 border border-gold-900/15 bg-overlay-section-50">
                          <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                            <Image src={currentProduct.images[0]} alt={currentProduct.name} fill className="object-cover" sizes="80px" />
                          </div>
                          <div>
                            <h4 className="text-luxury-cream font-display text-sm mb-1">{currentProduct.name}</h4>
                            <p className="text-luxury-cream/30 text-xs mb-2 line-clamp-2">{currentProduct.shortDescription}</p>
                            <p className="text-gold-300 font-semibold">{formatPrice(currentProduct.price)}</p>
                            {currentProduct.stock !== undefined && (
                              <p className="text-luxury-cream/25 text-[10px] mt-1">{currentProduct.stock} items in stock</p>
                            )}
                          </div>
                        </div>

                        {/* Size, Color, Quantity */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Size</label>
                            <select
                              value={selectedSize}
                              onChange={(e) => setSelectedSize(e.target.value)}
                              className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream/80 px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 appearance-none cursor-pointer"
                            >
                              <option value="">Select size</option>
                              {currentProduct.sizes.map((size) => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Color</label>
                            <div className="flex flex-wrap gap-2 min-h-[48px] items-center px-3 py-2 border border-gold-900/30 bg-theme-input">
                              {currentProduct.colors.length > 0 ? currentProduct.colors.map((color) => {
                                const colorId = color.name || color.hex;
                                const isSelected = selectedColor === colorId;
                                return (
                                  <button
                                    key={colorId}
                                    type="button"
                                    onClick={() => setSelectedColor(colorId)}
                                    className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                                      isSelected ? 'border-gold-400 scale-110 shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'border-gold-900/30 hover:border-gold-600/50'
                                    }`}
                                    title={color.name || color.hex}
                                  >
                                    <span
                                      className="block w-full h-full rounded-full"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                    {isSelected && (
                                      <span className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-4 h-4 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke={parseInt(color.hex.replace('#',''), 16) > 0x888888 ? '#000' : '#fff'} strokeWidth={3}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      </span>
                                    )}
                                  </button>
                                );
                              }) : (
                                <span className="text-luxury-cream/30 text-xs">No colors available</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Quantity</label>
                            <select
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream/80 px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 appearance-none cursor-pointer"
                            >
                              {Array.from({ length: Math.min(currentProduct.stock ?? 10, 10) }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {stockError && (
                          <p className="text-red-400 text-xs">{stockError}</p>
                        )}

                        <button
                          type="button"
                          onClick={addItem}
                          disabled={!selectedSize || !selectedColor}
                          className="btn-primary w-full sm:w-auto disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add to Order
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Items List */}
                {orderItems.length > 0 && (
                  <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-6 sm:p-8">
                    <h3 className="font-display text-lg text-luxury-cream mb-5">
                      Your Items <span className="text-gold-400/60 text-sm font-sans">({orderItems.length})</span>
                    </h3>
                    <div className="space-y-4">
                      {orderItems.map((item, index) => {
                        const product = products.find((p) => p.id === item.productId);
                        if (!product) return null;
                        return (
                          <div key={index} className="flex items-center gap-4 p-4 border border-gold-900/15 bg-overlay-section-50 group hover:border-gold-700/30 transition-colors duration-300">
                            <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden">
                              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-luxury-cream text-sm font-display truncate">{product.name}</h4>
                              <div className="flex items-center gap-3 mt-1 flex-wrap">
                                <span className="text-luxury-cream/30 text-xs">Size: {item.size}</span>
                                <span className="text-gold-800/30">•</span>
                                <span className="text-luxury-cream/30 text-xs flex items-center gap-1.5">
                                  Color:
                                  <span className="w-3 h-3 rounded-full inline-block border border-gold-800/30" style={{ backgroundColor: item.colorHex }} />
                                  {item.color}
                                </span>
                                <span className="text-gold-800/30">•</span>
                                <span className="text-luxury-cream/30 text-xs">Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-gold-300 font-semibold text-sm">{formatPrice(product.price * item.quantity)}</p>
                              <button type="button" onClick={() => removeItem(index)} className="text-[#FF6B6B]/50 hover:text-[#FF6B6B] text-[10px] uppercase tracking-wider mt-1 transition-colors duration-300">
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Customer Details */}
                <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-luxury-black" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }}>2</div>
                    <h2 className="font-display text-xl sm:text-2xl text-luxury-cream">Your <span className="text-gradient-gold">Details</span></h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="Enter first name" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="Enter last name" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="+94 (00) 000-0000" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Shipping Address *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="Street address" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="City" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Postal Code *</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 placeholder:text-luxury-cream/15" placeholder="00000" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Country *</label>
                        <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream/80 px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 appearance-none cursor-pointer">
                          <option value="">Select</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="NL">Netherlands</option>
                          <option value="BE">Belgium</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Order Notes</label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-theme-input border border-gold-900/30 text-luxury-cream px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 transition-colors duration-300 resize-none placeholder:text-luxury-cream/15" placeholder="Special requests, gift wrapping, custom measurements..." />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Method */}
                <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-luxury-black" style={{ background: 'linear-gradient(135deg, #B8860B, #D4AF37)' }}>3</div>
                    <h2 className="font-display text-xl sm:text-2xl text-luxury-cream">Payment <span className="text-gradient-gold">Method</span></h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-5 border text-left transition-all duration-300 ${
                        paymentMethod === 'cod'
                          ? 'border-gold-500/50 bg-gold-500/5'
                          : 'border-gold-900/20 hover:border-gold-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'border-gold-500' : 'border-gold-900/30'
                        }`}>
                          {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />}
                        </div>
                        <span className="text-luxury-cream font-display text-sm">Cash on Delivery</span>
                      </div>
                      <p className="text-luxury-cream/30 text-xs ml-8">Pay when your order is delivered to your doorstep.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-5 border text-left transition-all duration-300 ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-gold-500/50 bg-gold-500/5'
                          : 'border-gold-900/20 hover:border-gold-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'bank_transfer' ? 'border-gold-500' : 'border-gold-900/30'
                        }`}>
                          {paymentMethod === 'bank_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />}
                        </div>
                        <span className="text-luxury-cream font-display text-sm">Bank Transfer</span>
                      </div>
                      <p className="text-luxury-cream/30 text-xs ml-8">Transfer to our bank account and upload the receipt.</p>
                    </button>
                  </div>

                  {paymentMethod === 'bank_transfer' && (
                    <div className="space-y-5">
                      <div className="p-5 border border-gold-900/20 bg-overlay-section-50">
                        <h4 className="text-gold-400 text-[11px] uppercase tracking-[0.3em] mb-4">Bank Account Details</h4>
                        <div className="space-y-2.5">
                          {[
                            ['Bank', 'Commercial Bank of Ceylon'],
                            ['Account Name', 'Veenus Kleding'],
                            ['Account Number', '8000-1234-5678-9'],
                            ['Branch', 'Main Branch'],
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between items-center">
                              <span className="text-luxury-cream/40 text-xs">{label}</span>
                              <span className="text-luxury-cream text-sm font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60 mb-2">Upload Payment Slip *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleBankSlipChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className={`border-2 border-dashed p-6 text-center transition-colors duration-300 ${
                            bankSlipFile ? 'border-gold-500/30 bg-gold-500/5' : 'border-gold-900/20 hover:border-gold-900/40'
                          }`}>
                            {bankSlipPreview ? (
                              <div className="space-y-3">
                                <img src={bankSlipPreview} alt="Bank slip preview" className="max-h-40 mx-auto rounded" />
                                <p className="text-gold-400 text-xs">{bankSlipFile?.name}</p>
                                <p className="text-luxury-cream/20 text-[10px]">Click to change</p>
                              </div>
                            ) : (
                              <>
                                <svg className="w-10 h-10 mx-auto mb-3 text-gold-800/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                <p className="text-luxury-cream/40 text-sm mb-1">Click to upload payment slip</p>
                                <p className="text-luxury-cream/20 text-[10px]">JPG, PNG or PDF (max 5MB)</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-6 sm:p-8 lg:sticky lg:top-32">
                  <h3 className="font-display text-xl text-luxury-cream mb-6">Order <span className="text-gradient-gold">Summary</span></h3>

                  {orderItems.length === 0 ? (
                    <div className="text-center py-10">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gold-800/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p className="text-luxury-cream/30 text-sm mb-1">Your order is empty</p>
                      <p className="text-luxury-cream/15 text-xs">Add items from the selection above</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {orderItems.map((item, index) => {
                          const product = products.find((p) => p.id === item.productId);
                          if (!product) return null;
                          return (
                            <div key={index} className="flex justify-between items-start text-sm">
                              <div className="flex-1 min-w-0">
                                <p className="text-luxury-cream/70 truncate text-xs">{product.name}</p>
                                <p className="text-luxury-cream/25 text-[10px]">{item.size} / {item.color} × {item.quantity}</p>
                              </div>
                              <p className="text-gold-300/80 text-xs flex-shrink-0 ml-3">{formatPrice(product.price * item.quantity)}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="h-[1px] mb-4" style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.2), transparent)' }} />

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-xs">
                          <span className="text-luxury-cream/40">Subtotal</span>
                          <span className="text-luxury-cream/60">{formatPrice(getSubtotal())}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-luxury-cream/40">Shipping</span>
                          <span className="text-gold-400/60 text-[10px]">
                            {appliedPromo?.type === 'free_shipping' ? (
                              <span className="text-green-400">FREE</span>
                            ) : !formData.country ? (
                              'Select country'
                            ) : (
                              formatPrice(getShippingCost())
                            )}
                          </span>
                        </div>
                        {formData.country && (
                          <p className="text-luxury-cream/15 text-[10px]">
                            {formData.country === 'LK' ? 'Sri Lanka domestic rate' : 'International shipping rate'}
                          </p>
                        )}
                        {appliedPromo && appliedPromo.type === 'discount' && (
                          <div className="flex justify-between text-xs">
                            <span className="text-green-400/80">Discount ({appliedPromo.value}%)</span>
                            <span className="text-green-400/80">-{formatPrice(getDiscount())}</span>
                          </div>
                        )}
                      </div>

                      {/* Promo Code */}
                      <div className="mb-6">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-luxury-cream/40 mb-2">Promo Code</label>
                        {appliedPromo ? (
                          <div className="flex items-center justify-between p-3 border border-green-500/30 bg-green-500/10">
                            <div>
                              <span className="text-green-400 font-mono text-sm">{appliedPromo.code}</span>
                              <span className="text-green-400/60 text-[10px] ml-2">
                                {appliedPromo.type === 'discount' ? `${appliedPromo.value}% off` : 'Free shipping'}
                              </span>
                            </div>
                            <button type="button" onClick={handleRemovePromo} className="text-red-400/60 hover:text-red-400 text-[10px] uppercase tracking-wider">Remove</button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder="Enter code" className="flex-1 bg-theme-input border border-gold-900/30 text-luxury-cream px-3 py-2 text-xs font-mono focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-luxury-cream/15" />
                            <button type="button" onClick={handleApplyPromo} disabled={promoLoading || !promoInput.trim()} className="px-3 py-2 text-[10px] uppercase tracking-wider border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-colors disabled:opacity-30">
                              {promoLoading ? '...' : 'Apply'}
                            </button>
                          </div>
                        )}
                        {promoError && <p className="text-red-400 text-[10px] mt-1">{promoError}</p>}
                      </div>

                      <div className="h-[1px] mb-4" style={{ background: 'linear-gradient(90deg, rgba(184,134,11,0.3), transparent)' }} />

                      <div className="flex justify-between text-xs mb-4">
                        <span className="text-luxury-cream/40">Payment</span>
                        <span className="text-luxury-cream/60">
                          {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-8">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-luxury-cream/60">Total</span>
                        <span className="text-gold-300 text-xl font-semibold" style={{ textShadow: '0 0 15px rgba(184,134,11,0.2)' }}>
                          {formatPrice(getFinalTotal())}
                        </span>
                      </div>
                    </>
                  )}

                  {orderError && (
                    <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
                      {orderError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={orderItems.length === 0 || orderLoading}
                    className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {orderLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-luxury-black/30 border-t-luxury-black rounded-full animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Place Order
                      </>
                    )}
                  </button>

                  <p className="text-luxury-cream/15 text-[10px] text-center mt-4 leading-relaxed">
                    By placing this order you agree to our terms and conditions.
                  </p>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-6 space-y-3" style={{ borderTop: '1px solid rgba(184,134,11,0.1)' }}>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-600/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-luxury-cream/25 text-[10px] tracking-wider">Secure & Encrypted</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-600/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <span className="text-luxury-cream/25 text-[10px] tracking-wider">Premium Shipping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-600/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                      </svg>
                      <span className="text-luxury-cream/25 text-[10px] tracking-wider">Easy Returns & Exchanges</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
