'use client';

import { useState } from 'react';
import {
  orders,
  products,
  customers,
  revenueData,
  weeklyRevenueData,
  monthlyRevenueData,
  categorySales,
  topProducts,
} from '@/data';
import RevenueChart from '@/components/RevenueChart';

type ReportPeriod = 'daily' | 'weekly' | 'monthly';
type ReportType = 'sales' | 'products' | 'customers' | 'orders';

export default function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>('daily');
  const [activeReport, setActiveReport] = useState<ReportType>('sales');
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const chartData = {
    daily: revenueData,
    weekly: weeklyRevenueData,
    monthly: monthlyRevenueData,
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setExportStatus(`Generating ${format.toUpperCase()} report...`);
    setTimeout(() => {
      setExportStatus(`${format.toUpperCase()} report generated successfully!`);
      setTimeout(() => setExportStatus(null), 3000);
    }, 1500);
  };

  // ── Computed analytics ──
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled');
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const fulfillmentRate = orders.length > 0 ? (deliveredOrders.length / orders.length) * 100 : 0;
  const cancellationRate = orders.length > 0 ? (cancelledOrders.length / orders.length) * 100 : 0;

  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );

  const productRevenueMap: Record<string, { name: string; revenue: number; quantity: number }> = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      if (!productRevenueMap[item.product.id]) {
        productRevenueMap[item.product.id] = { name: item.product.name, revenue: 0, quantity: 0 };
      }
      productRevenueMap[item.product.id].revenue += item.price;
      productRevenueMap[item.product.id].quantity += item.quantity;
    });
  });

  const productRevenueSorted = Object.values(productRevenueMap).sort((a, b) => b.revenue - a.revenue);

  const countryDistribution: Record<string, number> = {};
  customers.forEach((c) => {
    countryDistribution[c.country] = (countryDistribution[c.country] || 0) + 1;
  });
  const countrySorted = Object.entries(countryDistribution).sort((a, b) => b[1] - a[1]);

  const ordersByDay: Record<string, number> = {};
  orders.forEach((o) => {
    ordersByDay[o.createdAt] = (ordersByDay[o.createdAt] || 0) + 1;
  });
  const busiestDay = Object.entries(ordersByDay).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Reports & Analytics</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Comprehensive business intelligence dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleExport('csv')} className="btn-outline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button onClick={() => handleExport('pdf')} className="btn-gold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {exportStatus && (
        <div className={`rounded-lg px-4 py-3 text-sm ${
          exportStatus.includes('successfully')
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-gold-500/10 border border-gold-500/20 text-gold-300'
        }`}>
          {exportStatus}
        </div>
      )}

      {/* Report Type Tabs */}
      <div className="admin-card p-1 flex items-center gap-1">
        {[
          { key: 'sales', label: 'Sales Report', icon: '💰' },
          { key: 'products', label: 'Product Performance', icon: '👗' },
          { key: 'customers', label: 'Customer Insights', icon: '👥' },
          { key: 'orders', label: 'Order Analytics', icon: '📦' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveReport(tab.key as ReportType)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeReport === tab.key
                ? 'bg-gold-800/20 text-gold-300'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════ SALES REPORT ═══════════ */}
      {activeReport === 'sales' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-bold text-gradient-gold mt-1">LKR {totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-1">+12.5% vs last period</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Avg Order Value</p>
              <p className="text-2xl font-bold text-gold-400 mt-1">LKR {Math.round(avgOrderValue).toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-1">+5.2% vs last period</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Items Sold</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{totalItemsSold}</p>
              <p className="text-xs text-green-400 mt-1">+8.1% vs last period</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Avg Revenue/Day</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                LKR {Math.round(revenueData.reduce((s, d) => s + d.revenue, 0) / revenueData.length).toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">+3.8% vs last period</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="admin-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Revenue Trend</h3>
              <div className="flex items-center gap-1 bg-[var(--bg-input)] rounded-lg p-1 border border-[var(--border)]">
                {(['daily', 'weekly', 'monthly'] as ReportPeriod[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      period === p ? 'bg-gold-800/30 text-gold-300' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <RevenueChart data={chartData[period]} timePeriod={period} />
          </div>

          {/* Category Breakdown */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Revenue by Category</h3>
            <div className="space-y-4">
              {categorySales.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[var(--text-heading)]">{cat.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[var(--text-secondary)]">{cat.value}%</span>
                      <span className="text-sm font-medium text-gold-400 w-24 text-right">LKR {cat.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold-700 to-gold-400 transition-all duration-700" style={{ width: `${cat.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════ PRODUCT PERFORMANCE ═══════════ */}
      {activeReport === 'products' && (
        <>
          {/* Product Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Products</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{products.length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Active Products</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{products.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Low Stock (&lt;15)</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{products.filter(p => (p.stock || 0) < 15).length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Avg Price</p>
              <p className="text-2xl font-bold text-gold-400 mt-1">
                LKR {Math.round(products.reduce((s, p) => s + p.price, 0) / products.length).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Top Performance Table */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top Performing Products</h3>
            <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Product</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Avg Price</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((item, i) => {
                  const maxRevenue = topProducts[0].revenue;
                  const pct = Math.round((item.revenue / maxRevenue) * 100);
                  return (
                    <tr key={item.product.id}>
                      <td>
                        <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                          i === 0 ? 'bg-gold-500 text-white' :
                          i === 1 ? 'bg-[#C0C0C0] text-[#333]' :
                          i === 2 ? 'bg-[#CD7F32] text-white' : 'bg-[var(--border)] text-[var(--text-label)]'
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] overflow-hidden flex-shrink-0">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{item.product.name}</p>
                            <p className="text-xs text-[var(--text-dim)]">{item.product.category.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-[var(--text-secondary)]">{item.totalSold}</td>
                      <td className="text-sm font-medium text-gold-400">LKR {item.revenue.toLocaleString()}</td>
                      <td className="text-sm text-[var(--text-secondary)]">LKR {Math.round(item.revenue / item.totalSold).toLocaleString()}</td>
                      <td>
                        <div className="w-24 h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gold-500" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>

          {/* Stock & Inventory */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Inventory Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.map((product) => {
                const stockLevel = product.stock || 0;
                const stockColor = stockLevel > 30 ? 'text-green-400' : stockLevel > 15 ? 'text-yellow-400' : 'text-red-400';
                const barColor = stockLevel > 30 ? 'bg-green-500' : stockLevel > 15 ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-light)]">
                    <div className="w-8 h-8 rounded bg-[var(--bg-hover)] overflow-hidden flex-shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--text-heading)] truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min((stockLevel / 60) * 100, 100)}%` }} />
                        </div>
                        <span className={`text-xs font-medium ${stockColor}`}>{stockLevel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ═══════════ CUSTOMER INSIGHTS ═══════════ */}
      {activeReport === 'customers' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Customers</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{customers.length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">VIP Customers</p>
              <p className="text-2xl font-bold text-gold-400 mt-1">{customers.filter(c => c.totalOrders >= 10 || c.totalSpent >= 30000).length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Avg Lifetime Value</p>
              <p className="text-2xl font-bold text-gradient-gold mt-1">
                LKR {Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length).toLocaleString()}
              </p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Countries</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{Object.keys(countryDistribution).length}</p>
            </div>
          </div>

          {/* Top Customers */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top Customers by Spend</h3>
            <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Avg Order</th>
                  <th>Tier</th>
                </tr>
              </thead>
              <tbody>
                {[...customers].sort((a, b) => b.totalSpent - a.totalSpent).map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-700 to-gold-500 flex items-center justify-center text-white text-xs font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{customer.name}</p>
                          <p className="text-xs text-[var(--text-dim)]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-[var(--text-secondary)]">{customer.city}, {customer.country}</td>
                    <td className="text-sm text-[var(--text-secondary)]">{customer.totalOrders}</td>
                    <td className="text-sm font-medium text-gold-400">LKR {customer.totalSpent.toLocaleString()}</td>
                    <td className="text-sm text-[var(--text-secondary)]">LKR {Math.round(customer.totalSpent / customer.totalOrders).toLocaleString()}</td>
                    <td>
                      {customer.totalSpent >= 50000 ? (
                        <span className="badge badge-gold">Platinum</span>
                      ) : customer.totalSpent >= 20000 ? (
                        <span className="badge badge-gold">Gold</span>
                      ) : customer.totalSpent >= 10000 ? (
                        <span className="badge badge-info">Silver</span>
                      ) : (
                        <span className="badge badge-neutral">Bronze</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Geography */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Customer Distribution by Country</h3>
            <div className="space-y-3">
              {countrySorted.map(([country, count]) => (
                <div key={country}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--text-heading)]">{country}</span>
                    <span className="text-sm text-[var(--text-secondary)]">{count} customers ({Math.round((count / customers.length) * 100)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold-700 to-gold-400" style={{ width: `${(count / customers.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════ ORDER ANALYTICS ═══════════ */}
      {activeReport === 'orders' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Orders</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{orders.length}</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Fulfillment Rate</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{fulfillmentRate.toFixed(1)}%</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Cancellation Rate</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{cancellationRate.toFixed(1)}%</p>
            </div>
            <div className="admin-card p-5">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Busiest Day</p>
              <p className="text-2xl font-bold text-gold-400 mt-1">{busiestDay ? new Date(busiestDay[0]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}</p>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">{busiestDay ? `${busiestDay[1]} orders` : ''}</p>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="admin-card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Order Status Distribution</h3>
              <div className="space-y-3">
                {(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => {
                  const count = orders.filter((o) => o.status === status).length;
                  const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
                  const colors: Record<string, string> = {
                    pending: 'bg-yellow-500',
                    confirmed: 'bg-blue-500',
                    processing: 'bg-blue-400',
                    shipped: 'bg-purple-500',
                    delivered: 'bg-green-500',
                    cancelled: 'bg-red-500',
                  };
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--text-secondary)] capitalize">{status}</span>
                        <span className="text-sm font-medium text-[var(--text-heading)]">{count} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="admin-card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Payment Status Overview</h3>
              <div className="space-y-3">
                {(['paid', 'pending', 'refunded', 'failed'] as const).map((status) => {
                  const count = orders.filter((o) => o.paymentStatus === status).length;
                  const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
                  const colors: Record<string, string> = {
                    paid: 'bg-green-500',
                    pending: 'bg-yellow-500',
                    refunded: 'bg-gray-500',
                    failed: 'bg-red-500',
                  };
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--text-secondary)] capitalize">{status}</span>
                        <span className="text-sm font-medium text-[var(--text-heading)]">{count} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Revenue by Order */}
          <div className="admin-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Revenue by Product (from Orders)</h3>
            <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity Ordered</th>
                  <th>Revenue</th>
                  <th>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {productRevenueSorted.map((item) => (
                  <tr key={item.name}>
                    <td className="text-sm font-medium text-[var(--text-primary)]">{item.name}</td>
                    <td className="text-sm text-[var(--text-secondary)]">{item.quantity}</td>
                    <td className="text-sm font-medium text-gold-400">LKR {item.revenue.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gold-500" style={{ width: `${(item.revenue / totalRevenue) * 100}%` }} />
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{((item.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
