'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOrders, updateOrderStatus } from '@/lib/firestore';
import { OrderStatus, Order } from '@/types';

export default function OrderDetailClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('pending');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getOrders().then((orders) => {
      const found = orders.find((o) => o.id === params.id);
      if (found) {
        setOrder(found);
        setCurrentStatus(found.status);
      }
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[var(--text-muted)]">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-[var(--text-dim)] text-lg mb-4">Order not found</p>
          <button onClick={() => router.push('/orders')} className="btn-gold">Back to Orders</button>
        </div>
      </div>
    );
  }

  const statusColors: Record<OrderStatus, string> = {
    pending: 'badge-warning',
    confirmed: 'badge-info',
    processing: 'badge-info',
    shipped: 'badge-gold',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
    returned: 'badge-danger',
  };

  const statusTimeline: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentStepIndex = statusTimeline.indexOf(currentStatus);

  const handleStatusUpdate = async () => {
    await updateOrderStatus(order!.id, currentStatus);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Order {order.orderNumber}</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
        <button onClick={() => router.push('/orders')} className="btn-outline">← Back to Orders</button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-green-400 text-sm">
          ✓ Order status updated successfully!
        </div>
      )}

      {/* Status Timeline */}
      {currentStatus !== 'cancelled' && currentStatus !== 'returned' && (
        <div className="admin-card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">Order Progress</h3>
          <div className="flex items-center justify-between">
            {statusTimeline.map((status, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              return (
                <div key={status} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {index > 0 && (
                      <div className={`flex-1 h-0.5 ${index <= currentStepIndex ? 'bg-gold-500' : 'bg-[var(--border)]'}`} />
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isCurrent ? 'bg-gold-500 text-white ring-4 ring-gold-500/20' :
                        isCompleted ? 'bg-gold-700 text-gold-100' : 'bg-[var(--bg-hover)] text-[var(--text-dim)]'
                      }`}
                    >
                      {isCompleted && index < currentStepIndex ? '✓' : index + 1}
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div className={`flex-1 h-0.5 ${index < currentStepIndex ? 'bg-gold-500' : 'bg-[var(--border)]'}`} />
                    )}
                  </div>
                  <span className={`text-xs mt-2 capitalize ${isCurrent ? 'text-gold-400 font-medium' : 'text-[var(--text-dim)]'}`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="admin-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-[var(--border-light)] last:border-0">
                  <div className="w-16 h-16 rounded-lg bg-[var(--bg-hover)] overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.product.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[var(--text-muted)]">Size: {item.size}</span>
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        Color: <span className="w-3 h-3 rounded-full inline-block border border-[var(--border-hover)]" style={{ backgroundColor: item.color.hex }} /> {item.color.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--text-primary)]">LKR {item.price.toLocaleString()}</p>
                    <p className="text-xs text-[var(--text-dim)]">LKR {(item.price / item.quantity).toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="text-[var(--text-primary)]">LKR {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Shipping</span>
                <span className="text-[var(--text-primary)]">{order.shipping === 0 ? 'Free' : `LKR ${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">Tax</span>
                <span className="text-[var(--text-primary)]">LKR {order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--border-light)]">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-gradient-gold">LKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="admin-card p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">Order Notes</h3>
              <p className="text-sm text-[var(--text-secondary)]">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="admin-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Update Status</h3>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
              className="admin-select mb-3"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
            <button onClick={handleStatusUpdate} className="btn-gold w-full">
              Update Status
            </button>

            <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--text-muted)]">Current Status</span>
                <span className={`badge ${statusColors[currentStatus]}`}>{currentStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Payment</span>
                <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : order.paymentStatus === 'refunded' ? 'badge-neutral' : 'badge-warning'}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="admin-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Customer</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{order.customer.name}</p>
                <p className="text-xs text-[var(--text-dim)]">
                  {order.customer.totalOrders} orders · LKR {order.customer.totalSpent.toLocaleString()} total
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-light)] space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[var(--text-dim)] w-12 flex-shrink-0 mt-0.5">Email</span>
                  <span className="text-sm text-[var(--text-heading)]">{order.customer.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[var(--text-dim)] w-12 flex-shrink-0 mt-0.5">Phone</span>
                  <span className="text-sm text-[var(--text-heading)]">{order.customer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="admin-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Shipping Address</h3>
            <div className="text-sm text-[var(--text-secondary)] space-y-1">
              <p>{order.customer.name}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.postalCode}</p>
              <p>{order.customer.country}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="admin-card p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Timeline</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Created</span>
                <span className="text-[var(--text-secondary)]">{new Date(order.createdAt).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Updated</span>
                <span className="text-[var(--text-secondary)]">{new Date(order.updatedAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
