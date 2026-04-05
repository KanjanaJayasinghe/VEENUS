'use client';

interface SpinResultPopupProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    type: 'try_again' | 'discount' | 'free_shipping';
    value: number;
    promoCode?: string;
  } | null;
}

export default function SpinResultPopup({ isOpen, onClose, result }: SpinResultPopupProps) {
  if (!isOpen || !result) return null;

  const isTryAgain = result.type === 'try_again';
  const isDiscount = result.type === 'discount';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-sm border border-gold-900/30 rounded-xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, var(--bg-section) 0%, var(--bg-page) 100%)' }}
      >
        {/* Decorative top glow */}
        {!isTryAgain && (
          <div className="absolute top-0 left-0 right-0 h-40" style={{ background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.15) 0%, transparent 70%)' }} />
        )}

        <div className="relative p-8 sm:p-10 text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-luxury-cream/30 hover:text-luxury-cream transition-colors rounded-full hover:bg-white/5"
          >
            ✕
          </button>

          {isTryAgain ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-luxury-cream/10 flex items-center justify-center bg-luxury-cream/5">
                <span className="text-4xl">😔</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-luxury-cream mb-3">
                Try Again!
              </h3>
              <p className="text-luxury-cream/40 text-sm leading-relaxed max-w-xs mx-auto">
                Better luck next time! You still have spins remaining. Give it another shot!
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gold-500/50 flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)' }}>
                <span className="text-5xl">{isDiscount ? '🎉' : '🚚'}</span>
              </div>
              <p className="text-gold-400 text-[10px] uppercase tracking-[0.4em] mb-2">Congratulations!</p>
              <h3 className="font-display text-2xl sm:text-3xl text-luxury-cream mb-2">
                You Won!
              </h3>
              <p className="text-gradient-gold text-3xl sm:text-4xl font-display font-bold mb-6">
                {isDiscount ? `${result.value}% OFF` : 'Free Shipping!'}
              </p>

              {result.promoCode && (
                <div className="mb-6">
                  <p className="text-luxury-cream/40 text-[10px] uppercase tracking-[0.3em] mb-3">
                    Your Promo Code
                  </p>
                  <div
                    className="inline-block px-8 py-4 border-2 border-dashed border-gold-500/40 rounded-lg bg-gold-900/15 font-mono text-gold-300 text-xl sm:text-2xl tracking-[0.3em] select-all cursor-pointer hover:border-gold-500/60 hover:bg-gold-900/25 transition-all"
                    onClick={() => {
                      if (result.promoCode) {
                        navigator.clipboard.writeText(result.promoCode);
                      }
                    }}
                    title="Click to copy"
                  >
                    {result.promoCode}
                  </div>
                  <p className="text-luxury-cream/25 text-[10px] mt-2 tracking-wider">
                    Tap to copy code
                  </p>
                </div>
              )}

              <div className="p-4 border border-gold-900/15 rounded-lg bg-[var(--bg-section)]">
                <p className="text-luxury-cream/50 text-xs sm:text-sm leading-relaxed">
                  Apply this code at checkout to enjoy your{' '}
                  <span className="text-gold-400">{isDiscount ? `${result.value}% discount` : 'free shipping'}</span>.
                </p>
              </div>

              <p className="text-luxury-cream/15 text-[10px] mt-4 tracking-wider">
                Valid for 30 days • Single use only
              </p>
            </>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 font-display text-sm uppercase tracking-[0.2em] rounded-lg transition-all"
            style={{
              background: isTryAgain
                ? 'linear-gradient(135deg, #333, #222)'
                : 'linear-gradient(135deg, #F5E6A3 0%, #D4AF37 30%, #B8860B 70%, #8B6914 100%)',
              color: isTryAgain ? '#aaa' : '#000',
              boxShadow: isTryAgain ? 'none' : '0 4px 15px rgba(212,175,55,0.2)',
            }}
          >
            {isTryAgain ? 'Try Again' : 'Got It!'}
          </button>
        </div>
      </div>
    </div>
  );
}
