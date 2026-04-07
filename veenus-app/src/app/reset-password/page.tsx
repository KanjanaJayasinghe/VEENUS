'use client';

import { useState, useEffect } from 'react';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'loading' | 'form' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode');
    if (!code) {
      setError('Invalid or missing reset link.');
      setStatus('error');
      return;
    }
    setOobCode(code);
    verifyPasswordResetCode(auth, code)
      .then((userEmail) => {
        setEmail(userEmail);
        setStatus('form');
      })
      .catch(() => {
        setError('This reset link has expired or is invalid. Please request a new one.');
        setStatus('error');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPw) {
      setError('Passwords do not match.');
      return;
    }
    if (!oobCode) return;

    setError('');
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setStatus('success');
    } catch {
      setError('Failed to reset password. The link may have expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="border border-gold-900/30 bg-[var(--bg-section)] p-8">
          <div className="h-[2px] w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B8860B, #D4AF37, #B8860B, transparent)' }} />

          {status === 'loading' && (
            <div className="text-center py-8">
              <p className="text-[var(--text-secondary)]">Verifying reset link...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Link Expired
              </h1>
              <p className="text-red-500 mb-6">{error}</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-black text-white rounded hover:opacity-80 transition"
              >
                Back to Home
              </Link>
            </div>
          )}

          {status === 'form' && (
            <>
              <h1 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>
                Reset Password
              </h1>
              <p className="text-[var(--text-secondary)] text-center text-sm mb-6">
                Enter a new password for {email}
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gold-900/20 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded focus:outline-none focus:border-gold-900/50"
                      placeholder="At least 6 characters"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full px-4 py-3 border border-gold-900/20 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded focus:outline-none focus:border-gold-900/50"
                    placeholder="Re-enter password"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-black text-white font-medium rounded hover:opacity-80 transition disabled:opacity-50"
                >
                  {submitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Password Reset!
              </h1>
              <p className="text-[var(--text-secondary)] mb-6">
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-black text-white rounded hover:opacity-80 transition"
              >
                Go to Home & Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
