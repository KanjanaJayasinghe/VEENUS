'use client';

import { useState, useEffect } from 'react';
import {
  getLuckyWheelConfig,
  saveLuckyWheelConfig,
  getPromoCodes,
  deletePromoCode,
} from '@/lib/firestore';
import { LuckyWheelConfig, WheelSegment, PromoCode } from '@/types';

export default function LuckyWheelManagementPage() {
  const [config, setConfig] = useState<LuckyWheelConfig | null>(null);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'segments' | 'promos'>('config');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cfg, codes] = await Promise.all([getLuckyWheelConfig(), getPromoCodes()]);
      setConfig(cfg);
      setPromoCodes(codes);
    } catch (err) {
      console.error('Failed to load lucky wheel data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setMessage('');
    try {
      const { id, ...rest } = config;
      await saveLuckyWheelConfig(rest);
      setMessage('Configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save configuration.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePromo = async (code: string) => {
    try {
      await deletePromoCode(code);
      setPromoCodes((prev) => prev.filter((p) => p.id !== code));
    } catch (err) {
      console.error('Failed to delete promo code:', err);
    }
  };

  const updateSegment = (index: number, field: keyof WheelSegment, value: string | number) => {
    if (!config) return;
    const segments = [...config.segments];
    segments[index] = { ...segments[index], [field]: value };
    setConfig({ ...config, segments });
  };

  const addSegment = () => {
    if (!config) return;
    const newSeg: WheelSegment = {
      id: String(Date.now()),
      label: 'Try Again',
      type: 'try_again',
      value: 0,
      color: '#1a1a1a',
      textColor: '#D4AF37',
    };
    setConfig({ ...config, segments: [...config.segments, newSeg] });
  };

  const removeSegment = (index: number) => {
    if (!config || config.segments.length <= 2) return;
    const segments = config.segments.filter((_, i) => i !== index);
    setConfig({ ...config, segments });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[var(--text-dim)] text-sm">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 text-center text-[var(--text-dim)]">
        Failed to load lucky wheel configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-heading)]">
            🎡 Lucky Wheel Management
          </h1>
          <p className="text-sm text-[var(--text-dim)] mt-1">
            Configure the lucky wheel, manage segments, and view promo codes
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 text-white text-sm font-medium rounded-lg hover:from-gold-600 hover:to-gold-400 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg text-sm ${
          message.includes('success')
            ? 'bg-green-500/10 border border-green-500/30 text-green-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)] w-fit">
        {[
          { key: 'config', label: 'General Settings' },
          { key: 'segments', label: 'Wheel Segments' },
          { key: 'promos', label: 'Promo Codes' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-gold-900/30 to-gold-800/20 text-gold-300'
                : 'text-[var(--text-label)] hover:text-[var(--text-heading)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings Tab */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lucky Wheel Status */}
          <div className="p-6 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
            <h3 className="text-lg font-display text-[var(--text-heading)] mb-4">
              Wheel Status
            </h3>
            <div className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Lucky Wheel Enabled</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">
                  When disabled, the wheel will not be accessible to users
                </p>
              </div>
              <button
                onClick={() => setConfig({ ...config, enabled: !config.enabled })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  config.enabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  config.enabled ? 'left-6' : 'left-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* Try Again Threshold */}
          <div className="p-6 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
            <h3 className="text-lg font-display text-[var(--text-heading)] mb-4">
              Try Again Threshold
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[var(--text-dim)] mb-1">
                  Consecutive &quot;Try Again&quot; count before a reward is triggered
                </label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={config.tryAgainThreshold}
                  onChange={(e) => setConfig({ ...config, tryAgainThreshold: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-hover)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:border-gold-500/50"
                />
              </div>
              <div className="p-3 bg-gold-900/10 border border-gold-900/20 rounded-lg">
                <p className="text-xs text-gold-400">
                  Current global counter: <strong>{config.globalTryAgainCounter}</strong> / {config.tryAgainThreshold}
                </p>
                <p className="text-xs text-[var(--text-dim)] mt-1">
                  Next reward will trigger after {config.tryAgainThreshold - config.globalTryAgainCounter} more &quot;Try Again&quot; results globally.
                </p>
              </div>
              <button
                onClick={() => setConfig({ ...config, globalTryAgainCounter: 0 })}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Reset Counter to 0
              </button>
            </div>
          </div>

          {/* Max Spins Per Month */}
          <div className="p-6 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
            <h3 className="text-lg font-display text-[var(--text-heading)] mb-4">
              Monthly Spin Limit
            </h3>
            <div>
              <label className="block text-xs text-[var(--text-dim)] mb-1">
                Maximum spins per user per month
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={config.maxSpinsPerMonth}
                onChange={(e) => setConfig({ ...config, maxSpinsPerMonth: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full px-4 py-2.5 bg-[var(--bg-hover)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:border-gold-500/50"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
            <h3 className="text-lg font-display text-[var(--text-heading)] mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-hover)] rounded-lg text-center">
                <p className="text-2xl font-bold text-gold-400">{config.segments.length}</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Segments</p>
              </div>
              <div className="p-4 bg-[var(--bg-hover)] rounded-lg text-center">
                <p className="text-2xl font-bold text-gold-400">
                  {config.segments.filter((s) => s.type !== 'try_again').length}
                </p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Reward Segments</p>
              </div>
              <div className="p-4 bg-[var(--bg-hover)] rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">
                  {promoCodes.filter((p) => !p.used).length}
                </p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Active Codes</p>
              </div>
              <div className="p-4 bg-[var(--bg-hover)] rounded-lg text-center">
                <p className="text-2xl font-bold text-[var(--text-secondary)]">
                  {promoCodes.filter((p) => p.used).length}
                </p>
                <p className="text-xs text-[var(--text-dim)] mt-1">Used Codes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Segments Tab */}
      {activeTab === 'segments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-dim)]">
              Configure the wheel segments. Each segment represents a possible outcome.
            </p>
            <button
              onClick={addSegment}
              className="px-4 py-2 text-sm border border-gold-500/30 text-gold-400 rounded-lg hover:bg-gold-500/10 transition-colors"
            >
              + Add Segment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">#</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Label</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Value</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">BG Color</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Text Color</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {config.segments.map((seg, i) => (
                  <tr key={seg.id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-hover)]">
                    <td className="py-3 px-4 text-[var(--text-dim)]">{i + 1}</td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={seg.label}
                        onChange={(e) => updateSegment(i, 'label', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[var(--bg-hover)] border border-[var(--border)] rounded text-[var(--text-primary)] text-sm focus:outline-none focus:border-gold-500/50"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={seg.type}
                        onChange={(e) => updateSegment(i, 'type', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[var(--bg-hover)] border border-[var(--border)] rounded text-[var(--text-primary)] text-sm focus:outline-none focus:border-gold-500/50"
                      >
                        <option value="try_again">Try Again</option>
                        <option value="discount">Discount %</option>
                        <option value="free_shipping">Free Shipping</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={seg.value}
                        onChange={(e) => updateSegment(i, 'value', parseInt(e.target.value) || 0)}
                        disabled={seg.type === 'try_again' || seg.type === 'free_shipping'}
                        className="w-20 px-3 py-1.5 bg-[var(--bg-hover)] border border-[var(--border)] rounded text-[var(--text-primary)] text-sm focus:outline-none focus:border-gold-500/50 disabled:opacity-40"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={seg.color}
                          onChange={(e) => updateSegment(i, 'color', e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-0"
                        />
                        <span className="text-xs text-[var(--text-dim)] font-mono">{seg.color}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={seg.textColor}
                          onChange={(e) => updateSegment(i, 'textColor', e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-0"
                        />
                        <span className="text-xs text-[var(--text-dim)] font-mono">{seg.textColor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removeSegment(i)}
                        disabled={config.segments.length <= 2}
                        className="text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Remove segment"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Segment Preview */}
          <div className="p-6 bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
            <h3 className="text-lg font-display text-[var(--text-heading)] mb-4">Preview</h3>
            <div className="flex flex-wrap gap-2">
              {config.segments.map((seg, i) => (
                <div
                  key={seg.id}
                  className="px-3 py-1.5 rounded text-xs font-medium"
                  style={{ backgroundColor: seg.color, color: seg.textColor }}
                >
                  {seg.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Promo Codes Tab */}
      {activeTab === 'promos' && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-dim)]">
            All promo codes generated by the lucky wheel. Codes expire 30 days after creation.
          </p>

          {promoCodes.length === 0 ? (
            <div className="p-12 text-center bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)]">
              <p className="text-[var(--text-dim)]">No promo codes generated yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-light)]">
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Code</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Value</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium">Expires</th>
                    <th className="text-left py-3 px-4 text-[var(--text-dim)] text-xs uppercase tracking-wider font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((promo) => {
                      const isExpired = new Date(promo.expiresAt) < new Date();
                      return (
                        <tr key={promo.id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-hover)]">
                          <td className="py-3 px-4 font-mono text-gold-400">{promo.code}</td>
                          <td className="py-3 px-4 text-[var(--text-secondary)]">
                            {promo.type === 'discount' ? `Discount` : 'Free Shipping'}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-primary)]">
                            {promo.type === 'discount' ? `${promo.value}%` : '—'}
                          </td>
                          <td className="py-3 px-4">
                            {promo.used ? (
                              <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-xs">Used</span>
                            ) : isExpired ? (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Expired</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-dim)] text-xs">
                            {new Date(promo.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-dim)] text-xs">
                            {new Date(promo.expiresAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeletePromo(promo.id)}
                              className="text-red-400/60 hover:text-red-400 transition-colors"
                              title="Delete promo code"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
