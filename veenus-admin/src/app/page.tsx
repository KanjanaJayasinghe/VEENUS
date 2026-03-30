'use client';

import { useState, useEffect } from 'react';
import {
  dashboardStats,
  revenueData,
  weeklyRevenueData,
  monthlyRevenueData,
  topProducts,
  categorySales,
  recentActivity,
} from '@/data';
import { getOrders, getProducts, getCustomers } from '@/lib/firestore';
import { orders as staticOrders, products as staticProducts, customers as staticCustomers } from '@/data';
import { Order, Product, Customer } from '@/types';
import RevenueChart from '@/components/RevenueChart';
import Link from 'next/link';

type TimePeriod = 'daily' | 'weekly' | 'monthly';

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getProducts(), getCustomers()]).then(([ords, prods, custs]) => {
      setOrders(ords);
      setProducts(prods.products);
      setCustomers(custs);
      setLoading(false);
    }).catch((err) => {
      console.error('Firestore load failed, using static data:', err);
      setOrders(staticOrders);
      setProducts(staticProducts);
      setCustomers(staticCustomers);
      setLoading(false);
    });
  }, []);

  const chartData = {
    daily: revenueData,
    weekly: weeklyRevenueData,
    monthly: monthlyRevenueData,
  };

  const recentOrders = orders.slice(0, 5);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: 'Total Revenue',
      value: `LKR ${totalRevenue.toLocaleString()}`,
      change: dashboardStats.revenueChange,
      icon: '💰',
    },
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      change: dashboardStats.ordersChange,
      icon: '📦',
    },
    {
      label: 'Total Products',
      value: products.length.toString(),
      change: dashboardStats.productsChange,
      icon: '👗',
    },
    {
      label: 'Total Customers',
      value: customers.length.toString(),
      change: dashboardStats.customersChange,
      icon: '👥',
    },
  ];

  const orderStatusCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-[var(--text-muted)]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.change > 0
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </span>
            </div>
            <p className="text-2xl font-semibold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Revenue Overview</h2>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">Track your earnings over time</p>
          </div>
          <div className="flex items-center gap-1 bg-[var(--bg-input)] rounded-lg p-1 border border-[var(--border)]">
            {(['daily', 'weekly', 'monthly'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  timePeriod === period
                    ? 'bg-gold-800/30 text-gold-300'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <RevenueChart data={chartData[timePeriod]} timePeriod={timePeriod} />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Overview */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Order Status</h2>
          <div className="space-y-3">
            {Object.entries(orderStatusCounts).map(([status, count]) => {
              const colors: Record<string, string> = {
                pending: 'bg-yellow-500',
                processing: 'bg-blue-500',
                shipped: 'bg-purple-500',
                delivered: 'bg-green-500',
                cancelled: 'bg-red-500',
              };
              const total = orders.length;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--text-secondary)] capitalize">{status}</span>
                    <span className="text-sm font-medium text-[var(--text-heading)]">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[status]} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Top Products</h2>
            <Link href="/products" className="text-xs text-gold-400 hover:text-gold-300 transition-colors">
              View All →
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((item) => (
                <tr key={item.product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{item.product.name}</p>
                        <p className="text-xs text-[var(--text-dim)]">{item.product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-[var(--text-secondary)]">{item.totalSold} units</td>
                  <td className="text-sm font-medium text-gold-400">LKR {item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Orders</h2>
            <Link href="/orders" className="text-xs text-gold-400 hover:text-gold-300 transition-colors">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const statusColors: Record<string, string> = {
                pending: 'badge-warning',
                confirmed: 'badge-info',
                processing: 'badge-info',
                shipped: 'badge-info',
                delivered: 'badge-success',
                cancelled: 'badge-danger',
                returned: 'badge-danger',
              };
              return (
                <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-[var(--border-light)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{order.orderNumber}</p>
                    <p className="text-xs text-[var(--text-dim)]">{order.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                    <span className="text-sm font-medium text-[var(--text-heading)]">LKR {order.total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const icons: Record<string, string> = {
                order: '📦',
                product: '👗',
                customer: '👤',
              };
              return (
                <div key={activity.id} className="flex items-start gap-3 py-2.5 border-b border-[var(--border-light)] last:border-0">
                  <span className="text-base mt-0.5">{icons[activity.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-heading)]">{activity.message}</p>
                    <p className="text-xs text-[var(--text-dim)] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Sales */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Sales by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categorySales.map((cat) => (
            <div key={cat.name} className="text-center p-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-light)]">
              <div className="text-2xl font-bold text-gradient-gold">{cat.value}%</div>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{cat.name}</p>
              <p className="text-xs text-gold-600 mt-0.5">LKR {cat.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
