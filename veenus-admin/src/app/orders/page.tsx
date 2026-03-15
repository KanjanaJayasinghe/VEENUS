'use client';

import { useState } from 'react';
import Link from 'next/link';
import { orders } from '@/data';
import { OrderStatus } from '@/types';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || o.paymentStatus === filterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const statusColors: Record<OrderStatus, string> = {
    pending: 'badge-warning',
    confirmed: 'badge-info',
    processing: 'badge-info',
    shipped: 'badge-gold',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
    returned: 'badge-danger',
  };

  const paymentColors: Record<string, string> = {
    pending: 'badge-warning',
    paid: 'badge-success',
    failed: 'badge-danger',
    refunded: 'badge-neutral',
  };

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#e5e5e5]">All Orders</h2>
          <p className="text-sm text-[#666] mt-0.5">{orders.length} total orders</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-xs text-[#666] uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-bold text-[#e5e5e5] mt-1">{filteredOrders.length}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[#666] uppercase tracking-wider">Total Revenue</p>
          <p className="text-2xl font-bold text-gradient-gold mt-1">€{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[#666] uppercase tracking-wider">Avg Order Value</p>
          <p className="text-2xl font-bold text-gold-400 mt-1">€{Math.round(avgOrderValue).toLocaleString()}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[#666] uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {orders.filter((o) => o.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by order number, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select w-44"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="admin-select w-44"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="text-sm font-medium text-gold-400">{order.orderNumber}</span>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-[#e5e5e5]">{order.customer.name}</p>
                      <p className="text-xs text-[#555]">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="text-sm text-[#999]">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </td>
                  <td className="text-sm font-medium text-[#e5e5e5]">€{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td>
                    <span className={`badge ${paymentColors[order.paymentStatus]}`}>{order.paymentStatus}</span>
                  </td>
                  <td className="text-sm text-[#999]">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <Link
                      href={`/orders/${order.id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#222] transition-colors text-[#888] hover:text-gold-400"
                      title="View Details"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#555] text-sm">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
