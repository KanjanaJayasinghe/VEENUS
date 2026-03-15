export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="text-center">
        {/* Animated luxury loader */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer ring - gold gradient */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(92,67,5,0.3)',
            }}
          />
          {/* Spinning ring - bright gold */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#D4AF37',
              borderRightColor: 'rgba(184,134,11,0.3)',
            }}
          />
          {/* Inner spinning ring - reverse */}
          <div
            className="absolute inset-3 rounded-full animate-spin"
            style={{
              border: '1px solid transparent',
              borderBottomColor: '#B8860B',
              borderLeftColor: 'rgba(92,67,5,0.4)',
              animationDirection: 'reverse',
              animationDuration: '1.5s',
            }}
          />
          
          {/* Center V with gold glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-3xl"
              style={{
                background: 'linear-gradient(135deg, #5C4305, #D4AF37, #B8860B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))',
              }}
            >
              V
            </span>
          </div>

          {/* Decorative corner dots */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: '#B8860B' }} />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: '#5C4305' }} />
        </div>
        
        {/* Loading text with gold gradient */}
        <p
          className="text-sm uppercase tracking-[0.4em] animate-pulse"
          style={{
            background: 'linear-gradient(90deg, #5C4305, #D4AF37, #5C4305)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Loading
        </p>

        {/* Ornamental accent below */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-[1px] w-8" style={{ background: 'linear-gradient(90deg, transparent, #5C4305)' }} />
          <div className="w-1 h-1 rotate-45" style={{ background: '#B8860B' }} />
          <div className="h-[1px] w-8" style={{ background: 'linear-gradient(270deg, transparent, #5C4305)' }} />
        </div>
      </div>
    </div>
  );
}
