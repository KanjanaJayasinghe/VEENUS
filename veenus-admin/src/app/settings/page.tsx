'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'notifications' | 'appearance'>('general');
  const [saved, setSaved] = useState(false);

  const [storeName, setStoreName] = useState('Veenus');
  const [storeEmail, setStoreEmail] = useState('admin@veenus.com');
  const [currency, setCurrency] = useState('LKR');
  const [taxRate, setTaxRate] = useState('20');
  const [shippingFlat, setShippingFlat] = useState('15');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('500');

  const [adminName, setAdminName] = useState('Veenus Admin');
  const [adminEmail, setAdminEmail] = useState('admin@veenus.com');

  const [emailOrders, setEmailOrders] = useState(true);
  const [emailLowStock, setEmailLowStock] = useState(true);
  const [emailNewCustomer, setEmailNewCustomer] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState('10');

  const [accentColor, setAccentColor] = useState('#D4AF37');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: 'general', label: 'General', icon: '⚙️' },
    { key: 'account', label: 'Account', icon: '👤' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'appearance', label: 'Appearance', icon: '🎨' },
  ] as const;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your admin panel preferences</p>
      </div>

      {saved && (
        <div className="rounded-lg px-4 py-3 text-sm bg-green-500/10 border border-green-500/20 text-green-400">
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-52 flex-shrink-0">
          <div className="admin-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.key
                    ? 'bg-gold-800/20 text-gold-300'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="admin-card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Store Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Store Name</label>
                  <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="admin-input w-full" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Store Email</label>
                  <input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="admin-input w-full" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Currency</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="admin-select w-full">
                    <option value="LKR">LKR (Rs)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Tax Rate (%)</label>
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="admin-input w-full" />
                </div>
              </div>

              <hr className="border-[var(--border-light)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Shipping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Flat Shipping Rate (LKR)</label>
                  <input type="number" value={shippingFlat} onChange={(e) => setShippingFlat(e.target.value)} className="admin-input w-full" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Free Shipping Threshold (LKR)</label>
                  <input type="number" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(e.target.value)} className="admin-input w-full" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn-gold">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="admin-card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Admin Account</h3>

              <div className="flex items-center gap-5 p-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-light)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-700 to-gold-500 flex items-center justify-center text-white text-xl font-bold">
                  VA
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{adminName}</p>
                  <p className="text-xs text-[var(--text-muted)]">Super Admin</p>
                  <button className="text-xs text-gold-400 hover:text-gold-300 mt-1">Change Avatar</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Full Name</label>
                  <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="admin-input w-full" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Email</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="admin-input w-full" />
                </div>
              </div>

              <hr className="border-[var(--border-light)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="admin-input w-full" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">New Password</label>
                  <input type="password" placeholder="Enter new password" className="admin-input w-full" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn-gold">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="admin-card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Email Notifications</h3>

              <div className="space-y-4">
                {[
                  { label: 'New Order Notifications', desc: 'Receive email when a new order is placed', value: emailOrders, onChange: setEmailOrders },
                  { label: 'Low Stock Alerts', desc: 'Receive email when product stock falls below threshold', value: emailLowStock, onChange: setEmailLowStock },
                  { label: 'New Customer Registration', desc: 'Receive email when a new customer registers', value: emailNewCustomer, onChange: setEmailNewCustomer },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-light)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.onChange(!item.value)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${item.value ? 'bg-gold-600' : 'bg-[var(--border-hover)]'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${item.value ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>

              <hr className="border-[var(--border-light)]" />
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Low Stock Alert Threshold</label>
                <input type="number" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(e.target.value)} className="admin-input w-32" />
                <p className="text-xs text-[var(--text-dim)] mt-1">Alert when stock falls below this number</p>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn-gold">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="admin-card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Appearance</h3>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-[var(--border-hover)] bg-transparent"
                  />
                  <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="admin-input w-32" />
                  <div className="w-20 h-8 rounded" style={{ backgroundColor: accentColor }} />
                </div>
              </div>

              <hr className="border-[var(--border-light)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Preview</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: accentColor + '1a', border: `1px solid ${accentColor}33` }}>
                  <span className="text-sm" style={{ color: accentColor }}>Card Accent</span>
                </div>
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: accentColor }}>
                  Button
                </button>
                <div className="p-4 rounded-lg bg-[var(--bg-input)] border border-[var(--border-light)]">
                  <div className="h-2 rounded-full" style={{ backgroundColor: accentColor, width: '70%' }} />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={handleSave} className="btn-gold">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
