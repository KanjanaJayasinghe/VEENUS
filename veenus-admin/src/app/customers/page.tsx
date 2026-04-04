'use client';

import { useState, useEffect } from 'react';
import { getCustomers, getOrders } from '@/lib/firestore';
import { Customer, Order } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'spent' | 'recent'>('recent');

  useEffect(() => {
    Promise.all([getCustomers(), getOrders()]).then(([custData, orderData]) => {
      setCustomers(custData);
      setOrders(orderData);
      setLoading(false);
    }).catch((err) => {
      console.error('Firestore load failed:', err);
      setLoading(false);
    });
  }, []);

  const filteredCustomers = customers
    .filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'orders': return b.totalOrders - a.totalOrders;
        case 'spent': return b.totalSpent - a.totalSpent;
        case 'recent': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });

  const totalCustomerRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgCustomerValue = customers.length > 0 ? totalCustomerRevenue / customers.length : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-[var(--text-muted)]">Loading customers...</p>
          </div>
        </div>
      ) : (
      <>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Customers</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage and view customer information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Customers</p>
          <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{customers.length}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</p>
          <p className="text-2xl font-bold text-gradient-gold mt-1">LKR {totalCustomerRevenue.toLocaleString()}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Avg Customer Value</p>
          <p className="text-2xl font-bold text-gold-400 mt-1">LKR {Math.round(avgCustomerValue).toLocaleString()}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Repeat Customers</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {customers.filter((c) => c.totalOrders > 5).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
            />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="admin-select w-full sm:w-44">
            <option value="recent">Most Recent</option>
            <option value="name">Name A-Z</option>
            <option value="orders">Most Orders</option>
            <option value="spent">Highest Spend</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const customerOrders = orders.filter((o) => o.customer.id === customer.id);
                const lastOrder = customerOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                const isVip = customer.totalOrders >= 10 || customer.totalSpent >= 30000;

                return (
                  <tr key={customer.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-700 to-gold-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-[var(--text-primary)]">{customer.name}</p>
                            {isVip && <span className="text-xs text-gold-400">★ VIP</span>}
                          </div>
                          <p className="text-xs text-[var(--text-dim)]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm text-[var(--text-heading)]">{customer.city}</p>
                        <p className="text-xs text-[var(--text-dim)]">{customer.country}</p>
                      </div>
                    </td>
                    <td className="text-sm text-[var(--text-secondary)]">{customer.totalOrders}</td>
                    <td className="text-sm font-medium text-gold-400">LKR {customer.totalSpent.toLocaleString()}</td>
                    <td className="text-sm text-[var(--text-secondary)]">
                      {new Date(customer.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td>
                      {isVip ? (
                        <span className="badge badge-gold">VIP</span>
                      ) : customer.totalOrders > 5 ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-neutral">Regular</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
