'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';
import { getLuckyWheelConfig, getUserSpinCount, performSpin } from '@/lib/luckyWheel';
import { LuckyWheel, SpinResultPopup, AuthModal } from '@/components';
import { LuckyWheelConfig } from '@/types';

export default function LuckyWheelPage() {
  const { user, loading: authLoading } = useAuth();
  const [config, setConfig] = useState<LuckyWheelConfig | null>(null);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [targetSegmentIndex, setTargetSegmentIndex] = useState<number | null>(null);
  const [spinResult, setSpinResult] = useState<{
    type: 'try_again' | 'discount' | 'free_shipping';
    value: number;
    promoCode?: string;
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserSpins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadConfig = async () => {
    try {
      const cfg = await getLuckyWheelConfig();
      setConfig(cfg);
    } catch (err) {
      console.error('Failed to load wheel config:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserSpins = async () => {
    if (!user) return;
    try {
      const count = await getUserSpinCount(user.uid);
      setSpinsUsed(count);
    } catch (err) {
      console.error('Failed to load spin count:', err);
    }
  };

  const handleSpinStart = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!config) return;

    setSpinning(true);
    setError('');
    setTargetSegmentIndex(null);

    try {
      // Determine outcome FIRST from the server
      const result = await performSpin(user.uid);
      setSpinResult({
        type: result.segment.type,
        value: result.segment.value,
        promoCode: result.promoCode,
      });
      setSpinsUsed(prev => prev + 1);

      // Find the matching segment index so wheel lands on the correct one
      const idx = config.segments.findIndex(s => s.id === result.segment.id);
      setTargetSegmentIndex(idx >= 0 ? idx : 0);
    } catch (err: unknown) {
      setSpinning(false);
      const message = err instanceof Error ? err.message : 'Something went wrong';
      if (message === 'MAX_SPINS_REACHED') {
        setError('You have used all your spins for this month. Come back next month!');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleSpinEnd = () => {
    setSpinning(false);
    setTargetSegmentIndex(null);
    setShowResult(true);
  };

  const maxSpins = config?.maxSpinsPerMonth || 3;
  const remainingSpins = Math.max(0, maxSpins - spinsUsed);
  const noSpinsLeft = user ? remainingSpins <= 0 : false;

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-luxury-cream/40 tracking-widest text-sm uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 md:pt-40 pb-6 sm:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-optimized.webp')", opacity: 'var(--pattern-opacity)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />
        <div className="container-luxury relative">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-3 text-xs tracking-wider">
              <li>
                <Link href="/" className="text-luxury-cream/30 hover:text-gold-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="text-gold-800/30">/</li>
              <li className="text-gold-400">Lucky Wheel</li>
            </ol>
          </nav>

          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-700/30 rounded-full bg-gold-900/10 mb-5">
              <span className="text-xl">🎰</span>
              <span className="text-gold-400 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-medium">Exclusive Rewards</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-luxury-cream mb-4 sm:mb-6 leading-[1.1]">
              Spin & <span className="text-gradient-gold italic">Win</span>
            </h1>
            <div className="w-20 h-[1px] mx-auto mb-4 sm:mb-6" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            <p className="text-luxury-cream/40 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Try your luck for exclusive discounts and free shipping on your next luxury purchase
            </p>
          </div>
        </div>
      </section>

      {/* Main Wheel Section */}
      <section className="pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />
        <div className="container-luxury relative">
          {/* Auth gate */}
          {!user ? (
            <div className="max-w-md mx-auto text-center">
              <div className="border border-gold-900/20 bg-gradient-to-b from-[var(--bg-section-alt)] to-[var(--bg-section)] p-8 sm:p-12 rounded-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-gold-500/30 flex items-center justify-center bg-gold-900/10">
                  <svg className="w-10 h-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-luxury-cream mb-3">
                  Sign In to Play
                </h2>
                <p className="text-luxury-cream/40 text-sm mb-8 leading-relaxed">
                  Create an account or sign in to spin the wheel and win exclusive rewards.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary text-base px-10 py-3"
                >
                  Sign In to Spin
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Spin counter + welcome */}
              <div className="mb-6 sm:mb-8 text-center">
                <div className="inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 border border-gold-800/25 rounded-full bg-[var(--bg-section)]">
                  <span className="text-luxury-cream/50 text-xs sm:text-sm tracking-wider">Spins remaining</span>
                  <div className="w-[1px] h-5 bg-gold-800/30" />
                  <span className="text-gold-300 font-display text-xl sm:text-2xl font-bold">
                    {remainingSpins}<span className="text-luxury-cream/20 text-base">/{maxSpins}</span>
                  </span>
                </div>
                {user.displayName && (
                  <p className="text-luxury-cream/25 text-xs mt-3 tracking-wider">
                    Welcome, <span className="text-gold-400/80">{user.displayName}</span>
                  </p>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 max-w-md w-full p-4 border border-red-500/30 rounded-lg bg-red-500/10 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* The Wheel */}
              {config && (
                <LuckyWheel
                  segments={config.segments}
                  onSpinEnd={handleSpinEnd}
                  spinning={spinning}
                  targetSegmentIndex={targetSegmentIndex}
                  onSpinStart={handleSpinStart}
                  disabled={noSpinsLeft}
                  disabledMessage={noSpinsLeft ? 'No Spins Left This Month' : undefined}
                />
              )}

              {/* Prizes Summary */}
              <div className="mt-10 sm:mt-14 w-full max-w-2xl">
                <h3 className="text-center text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-6">Available Prizes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {config?.segments.filter(s => s.type !== 'try_again').map((seg) => (
                    <div key={seg.id} className="text-center p-3 sm:p-4 border border-gold-900/15 rounded-lg bg-[var(--bg-section)]">
                      <span className="text-lg sm:text-xl mb-1 block">{seg.type === 'free_shipping' ? '🚚' : '🎁'}</span>
                      <span className="text-gold-300 font-display text-xs sm:text-sm font-bold">{seg.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="mt-8 sm:mt-10 w-full max-w-2xl">
                <div className="p-5 sm:p-6 border border-gold-900/15 rounded-lg bg-[var(--bg-section)]">
                  <h4 className="text-gold-400 text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 text-center">How It Works</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-gold-700/30 flex items-center justify-center text-gold-400 font-display text-sm">1</div>
                      <p className="text-luxury-cream/50 text-xs leading-relaxed">Get <strong className="text-luxury-cream/70">{maxSpins} spins per month</strong></p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-gold-700/30 flex items-center justify-center text-gold-400 font-display text-sm">2</div>
                      <p className="text-luxury-cream/50 text-xs leading-relaxed">Win discounts or <strong className="text-luxury-cream/70">free shipping</strong></p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-gold-700/30 flex items-center justify-center text-gold-400 font-display text-sm">3</div>
                      <p className="text-luxury-cream/50 text-xs leading-relaxed">Apply your <strong className="text-luxury-cream/70">promo code at checkout</strong></p>
                    </div>
                  </div>
                  <p className="text-luxury-cream/20 text-[10px] text-center mt-4 tracking-wider">
                    Promo codes are valid for 30 days • Spins reset monthly
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Result Popup */}
      <SpinResultPopup
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        result={spinResult}
      />
    </>
  );
}
