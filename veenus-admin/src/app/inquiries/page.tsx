'use client';

import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '@/lib/firestore';
import { Inquiry, InquiryStatus } from '@/types';

const statusColors: Record<InquiryStatus, string> = {
  new: 'badge-warning',
  read: 'badge-info',
  replied: 'badge-success',
};

const subjectLabels: Record<string, string> = {
  general: 'General Inquiry',
  product: 'Product Information',
  appointment: 'Book an Appointment',
  press: 'Press & Media',
  careers: 'Careers',
  other: 'Other',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadInquiries = () => {
    setLoading(true);
    getInquiries()
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleMarkStatus = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => prev ? { ...prev, status } : prev);
    }
  };

  const handleView = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === 'new') {
      await handleMarkStatus(inquiry.id, 'read');
    }
  };

  const filtered = inquiries.filter((i) => {
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      i.subject.toLowerCase().includes(q) ||
      i.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  // ─── Detail View ───
  if (selectedInquiry) {
    return (
      <div className="max-w-3xl space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Inquiry Details</h2>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {new Date(selectedInquiry.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
              })}
            </p>
          </div>
          <button onClick={() => setSelectedInquiry(null)} className="btn-outline">
            ← Back to Inquiries
          </button>
        </div>

        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{selectedInquiry.name}</p>
              <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-gold-400 hover:underline">
                {selectedInquiry.email}
              </a>
              {selectedInquiry.phone && (
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">{selectedInquiry.phone}</p>
              )}
            </div>
            <span className={`badge ${statusColors[selectedInquiry.status]}`}>{selectedInquiry.status}</span>
          </div>

          <div className="border-t border-[var(--border-light)] pt-4">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Subject</p>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {subjectLabels[selectedInquiry.subject] || selectedInquiry.subject}
            </p>
          </div>

          <div className="border-t border-[var(--border-light)] pt-4">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
              {selectedInquiry.message}
            </p>
          </div>

          <div className="border-t border-[var(--border-light)] pt-4 flex flex-wrap gap-2">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider w-full mb-1">Mark as</p>
            {(['new', 'read', 'replied'] as InquiryStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => handleMarkStatus(selectedInquiry.id, s)}
                disabled={selectedInquiry.status === s}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize border transition-all ${
                  selectedInquiry.status === s
                    ? 'bg-gold-500/20 border-gold-500/40 text-gold-300 cursor-default'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-gold-500/40 hover:text-gold-300'
                }`}
              >
                {s}
              </button>
            ))}
            <a
              href={`mailto:${selectedInquiry.email}?subject=Re: ${subjectLabels[selectedInquiry.subject] || selectedInquiry.subject}`}
              onClick={() => handleMarkStatus(selectedInquiry.id, 'replied')}
              className="ml-auto btn-gold text-xs px-4 py-1.5"
            >
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── List View ───
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Inquiries
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-500 text-white text-[10px] font-bold">
                {newCount}
              </span>
            )}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{inquiries.length} total inquiries</p>
        </div>
        <button onClick={loadInquiries} className="btn-outline text-sm">
          ↻ Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'New', count: inquiries.filter((i) => i.status === 'new').length, color: 'text-yellow-400' },
          { label: 'Read', count: inquiries.filter((i) => i.status === 'read').length, color: 'text-blue-400' },
          { label: 'Replied', count: inquiries.filter((i) => i.status === 'replied').length, color: 'text-green-400' },
        ].map((stat) => (
          <div key={stat.label} className="admin-card p-4 text-center">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-card p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="admin-select w-full sm:w-40"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <p className="text-[var(--text-dim)] text-lg mb-2">No inquiries found</p>
          <p className="text-[var(--text-muted)] text-sm">Customer messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inquiry) => (
                  <tr key={inquiry.id} className={inquiry.status === 'new' ? 'bg-gold-900/5' : ''}>
                    <td>
                      <div className="flex items-center gap-2">
                        {inquiry.status === 'new' && (
                          <span className="w-2 h-2 rounded-full bg-gold-400 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-[var(--text-primary)]">{inquiry.name}</span>
                      </div>
                    </td>
                    <td className="text-sm text-[var(--text-secondary)]">{inquiry.email}</td>
                    <td className="text-sm text-[var(--text-secondary)]">
                      {subjectLabels[inquiry.subject] || inquiry.subject}
                    </td>
                    <td>
                      <span className={`badge ${statusColors[inquiry.status]}`}>{inquiry.status}</span>
                    </td>
                    <td className="text-sm text-[var(--text-secondary)]">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td>
                      <button
                        onClick={() => handleView(inquiry)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--border)] transition-colors text-[var(--text-label)] hover:text-gold-400"
                        title="View Inquiry"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
