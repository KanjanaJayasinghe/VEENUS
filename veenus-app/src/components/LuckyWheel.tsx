'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { WheelSegment } from '@/types';

interface LuckyWheelProps {
  segments: WheelSegment[];
  onSpinEnd: () => void;
  spinning: boolean;
  targetSegmentIndex: number | null;
  onSpinStart: () => void;
  disabled: boolean;
  disabledMessage?: string;
}

export default function LuckyWheel({
  segments,
  onSpinEnd,
  spinning,
  targetSegmentIndex,
  onSpinStart,
  disabled,
  disabledMessage,
}: LuckyWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);
  const hasStartedSpin = useRef(false);
  const [wheelSize, setWheelSize] = useState(320);

  // Responsive wheel size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 380) setWheelSize(260);
      else if (w < 500) setWheelSize(300);
      else if (w < 768) setWheelSize(340);
      else setWheelSize(380);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const center = wheelSize / 2;
  const radius = center - 12;

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = wheelSize * dpr;
    canvas.height = wheelSize * dpr;
    canvas.style.width = `${wheelSize}px`;
    canvas.style.height = `${wheelSize}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, wheelSize, wheelSize);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-center, -center);

    const arc = (2 * Math.PI) / segments.length;

    segments.forEach((seg, i) => {
      const angle = i * arc;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arc);
      ctx.closePath();

      // Gradient fill for segments
      const midAngle = angle + arc / 2;
      const gx = center + Math.cos(midAngle) * radius * 0.5;
      const gy = center + Math.sin(midAngle) * radius * 0.5;
      const segGrad = ctx.createRadialGradient(center, center, radius * 0.1, gx, gy, radius);
      if (seg.type === 'try_again') {
        segGrad.addColorStop(0, '#2a2a2a');
        segGrad.addColorStop(1, '#111111');
      } else if (seg.color === '#F59E0B') {
        segGrad.addColorStop(0, '#F59E0B');
        segGrad.addColorStop(1, '#D97706');
      } else {
        segGrad.addColorStop(0, '#E8C547');
        segGrad.addColorStop(1, '#B8860B');
      }
      ctx.fillStyle = segGrad;
      ctx.fill();

      // Segment borders
      ctx.strokeStyle = 'rgba(212,175,55,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);

      const fontSize = wheelSize < 300 ? 10 : wheelSize < 360 ? 11 : 13;
      ctx.fillStyle = seg.textColor;
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textRadius = radius * 0.65;
      ctx.save();
      ctx.translate(textRadius, 0);
      ctx.rotate(Math.PI / 2);

      const label = seg.label;
      const words = label.split(' ');
      const lineHeight = fontSize + 2;
      if (words.length > 1) {
        ctx.fillText(words[0], 0, -lineHeight / 2);
        ctx.fillText(words.slice(1).join(' '), 0, lineHeight / 2);
      } else {
        ctx.fillText(label, 0, 0);
      }
      ctx.restore();
      ctx.restore();
    });

    // Outer ring highlight
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(212,175,55,0.15)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center circle with gem effect
    const gemGrad = ctx.createRadialGradient(center - 4, center - 4, 0, center, center, 24);
    gemGrad.addColorStop(0, '#F5E6A3');
    gemGrad.addColorStop(0.4, '#D4AF37');
    gemGrad.addColorStop(1, '#8B6914');
    ctx.beginPath();
    ctx.arc(center, center, 24, 0, 2 * Math.PI);
    ctx.fillStyle = gemGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(245,230,163,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner gem highlight
    ctx.beginPath();
    ctx.arc(center - 3, center - 3, 8, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fill();

    ctx.restore();
  }, [rotation, segments, center, radius, wheelSize]);

  // Start spin animation when targetSegmentIndex becomes available
  const animateToTarget = useCallback((targetIndex: number) => {
    const arc = 360 / segments.length;
    // Pointer is at top = 270° in canvas coordinates
    // Segment i occupies from i*arc to (i+1)*arc
    // Center of segment i is at i*arc + arc/2
    // We need: (270 - finalRotation) mod 360 = targetCenter
    // So: finalRotation = 270 - targetCenter (mod 360)
    const segmentCenter = targetIndex * arc + arc / 2;
    const baseTarget = ((270 - segmentCenter) % 360 + 360) % 360;

    // Add small random offset within segment (stay within +-30% of segment)
    const jitter = (Math.random() - 0.5) * arc * 0.5;
    const targetAngle = baseTarget + jitter;

    // Calculate total rotation: current + at least 6 full spins + distance to target
    const currentNorm = ((rotation % 360) + 360) % 360;
    let delta = targetAngle - currentNorm;
    if (delta < 0) delta += 360;
    const totalRotation = 360 * 7 + delta; // 7 full rotations + precise landing

    const duration = 6000;
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom ease-out with stronger deceleration at the end
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRotation + totalRotation * eased;
      setRotation(currentRot % 360);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        onSpinEnd();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [rotation, segments, onSpinEnd]);

  // Watch for targetSegmentIndex to start the precise animation
  useEffect(() => {
    if (spinning && targetSegmentIndex !== null && !hasStartedSpin.current) {
      hasStartedSpin.current = true;
      animateToTarget(targetSegmentIndex);
    }
    if (!spinning) {
      hasStartedSpin.current = false;
    }
  }, [spinning, targetSegmentIndex, animateToTarget]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleClick = () => {
    if (spinning || disabled || segments.length === 0) return;
    onSpinStart();
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Glow effect behind wheel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] transition-opacity duration-1000"
        style={{
          width: wheelSize + 80,
          height: wheelSize + 80,
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(184,134,11,0.1) 50%, transparent 70%)',
          opacity: spinning ? 1 : 0.5,
        }}
      />

      {/* Pointer / Arrow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10" style={{ marginTop: -2 }}>
        <div className="relative">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '32px solid #D4AF37',
              filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.5))',
            }}
          />
          <div
            className="absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '20px solid #F5E6A3',
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      {/* Wheel */}
      <div className="relative" style={{ padding: 6 }}>
        {/* Outer decorative ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #F5E6A3 0%, #D4AF37 25%, #8B6914 50%, #D4AF37 75%, #F5E6A3 100%)',
            boxShadow: spinning
              ? '0 0 50px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.2), inset 0 0 30px rgba(0,0,0,0.3)'
              : '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.5s',
          }}
        />
        {/* Tick marks around the rim */}
        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ zIndex: 1 }}>
          {Array.from({ length: segments.length * 2 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 h-[6px] w-[2px] bg-black/30"
              style={{
                transformOrigin: `50% ${(wheelSize + 12) / 2}px`,
                transform: `rotate(${(i * 360) / (segments.length * 2)}deg)`,
              }}
            />
          ))}
        </div>
        <div className="relative" style={{ zIndex: 2 }}>
          <canvas
            ref={canvasRef}
            style={{ width: wheelSize, height: wheelSize, display: 'block', borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleClick}
        disabled={spinning || disabled}
        className="mt-8 relative group disabled:cursor-not-allowed"
      >
        <div
          className="absolute inset-0 rounded-full blur-md transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
            opacity: spinning || disabled ? 0 : 0.4,
          }}
        />
        <div
          className="relative px-12 py-4 text-base font-display uppercase tracking-[0.3em] transition-all duration-300"
          style={{
            background: spinning || disabled
              ? 'linear-gradient(135deg, #3a3a3a, #2a2a2a)'
              : 'linear-gradient(135deg, #F5E6A3 0%, #D4AF37 30%, #B8860B 70%, #8B6914 100%)',
            color: spinning || disabled ? '#666' : '#000',
            borderRadius: '50px',
            boxShadow: spinning || disabled
              ? 'none'
              : '0 4px 20px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {spinning ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
              Spinning...
            </span>
          ) : disabled ? (
            disabledMessage || 'No Spins Left'
          ) : (
            'SPIN THE WHEEL'
          )}
        </div>
      </button>
    </div>
  );
}
