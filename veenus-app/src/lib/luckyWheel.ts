import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { LuckyWheelConfig, WheelSegment, PromoCode } from '@/types';

// ─── Default Wheel Configuration ───

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: '1', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '2', label: '10% OFF', type: 'discount', value: 10, color: '#D4AF37', textColor: '#000000' },
  { id: '3', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '4', label: 'Free Shipping', type: 'free_shipping', value: 0, color: '#F59E0B', textColor: '#000000' },
  { id: '5', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '6', label: '25% OFF', type: 'discount', value: 25, color: '#D4AF37', textColor: '#000000' },
  { id: '7', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '8', label: 'LKR 200 OFF', type: 'discount', value: 5, color: '#F59E0B', textColor: '#000000' },
  { id: '9', label: 'Try Again', type: 'try_again', value: 0, color: '#1a1a1a', textColor: '#D4AF37' },
  { id: '10', label: 'LKR 500 OFF', type: 'discount', value: 15, color: '#D4AF37', textColor: '#000000' },
];

const DEFAULT_CONFIG: Omit<LuckyWheelConfig, 'id'> = {
  segments: DEFAULT_SEGMENTS,
  tryAgainThreshold: 30,
  globalTryAgainCounter: 0,
  maxSpinsPerMonth: 3,
  enabled: true,
  updatedAt: new Date().toISOString(),
};

// ─── Get Lucky Wheel Config ───

export async function getLuckyWheelConfig(): Promise<LuckyWheelConfig> {
  const docRef = doc(db, 'luckyWheelConfig', 'main');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as LuckyWheelConfig;
  }
  // Initialize default config if it doesn't exist
  const config = { ...DEFAULT_CONFIG, updatedAt: new Date().toISOString() };
  await setDoc(docRef, config);
  return { id: 'main', ...config };
}

// ─── Get User Spin Record for Current Month ───

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export async function getUserSpinCount(userId: string): Promise<number> {
  const month = getCurrentMonth();
  const docRef = doc(db, 'userSpins', `${userId}_${month}`);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data().spinCount || 0;
  }
  return 0;
}

// ─── Generate Promo Code ───

function generatePromoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'VK-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ─── Determine Spin Result (Server-side Logic) ───

export async function performSpin(userId: string): Promise<{
  segment: WheelSegment;
  promoCode?: string;
  remainingSpins: number;
}> {
  const config = await getLuckyWheelConfig();
  const month = getCurrentMonth();
  const spinDocRef = doc(db, 'userSpins', `${userId}_${month}`);
  const configRef = doc(db, 'luckyWheelConfig', 'main');

  // Check spin count
  const spinSnap = await getDoc(spinDocRef);
  const currentSpinCount = spinSnap.exists() ? (spinSnap.data().spinCount || 0) : 0;

  if (currentSpinCount >= config.maxSpinsPerMonth) {
    throw new Error('MAX_SPINS_REACHED');
  }

  // Determine outcome based on global try-again counter
  const globalCounter = config.globalTryAgainCounter || 0;
  let resultSegment: WheelSegment;
  let promoCode: string | undefined;

  if (globalCounter >= config.tryAgainThreshold) {
    // Time to give a reward! Pick a random reward segment
    const rewardSegments = config.segments.filter(s => s.type !== 'try_again');
    if (rewardSegments.length > 0) {
      resultSegment = rewardSegments[Math.floor(Math.random() * rewardSegments.length)];
    } else {
      // Fallback to try_again if no reward segments configured
      resultSegment = config.segments.find(s => s.type === 'try_again') || config.segments[0];
    }
  } else {
    // Result is "Try Again"
    const tryAgainSegments = config.segments.filter(s => s.type === 'try_again');
    resultSegment = tryAgainSegments.length > 0
      ? tryAgainSegments[Math.floor(Math.random() * tryAgainSegments.length)]
      : config.segments[0];
  }

  // If reward, generate promo code and reset counter
  if (resultSegment.type !== 'try_again') {
    promoCode = generatePromoCode();

    // Save promo code
    const promoRef = doc(db, 'promoCodes', promoCode);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await setDoc(promoRef, {
      code: promoCode,
      type: resultSegment.type,
      value: resultSegment.value,
      userId,
      used: false,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    // Reset global counter
    await updateDoc(configRef, {
      globalTryAgainCounter: 0,
    });
  } else {
    // Increment global counter
    await updateDoc(configRef, {
      globalTryAgainCounter: increment(1),
    });
  }

  // Update user spin record
  const newSpinCount = currentSpinCount + 1;
  const spinData = {
    userId,
    month,
    spinCount: newSpinCount,
    lastSpinAt: new Date().toISOString(),
  };

  if (spinSnap.exists()) {
    await updateDoc(spinDocRef, {
      spinCount: increment(1),
      lastSpinAt: new Date().toISOString(),
    });
  } else {
    await setDoc(spinDocRef, spinData);
  }

  return {
    segment: resultSegment,
    promoCode,
    remainingSpins: config.maxSpinsPerMonth - newSpinCount,
  };
}

// ─── Validate Promo Code ───

export async function validatePromoCode(code: string): Promise<PromoCode | null> {
  const docRef = doc(db, 'promoCodes', code.toUpperCase().trim());
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;

  const promo = { id: snap.id, ...snap.data() } as PromoCode;

  // Check if expired
  if (new Date(promo.expiresAt) < new Date()) return null;
  // Check if already used
  if (promo.used) return null;

  return promo;
}

// ─── Mark Promo Code as Used ───

export async function markPromoCodeUsed(code: string): Promise<void> {
  const docRef = doc(db, 'promoCodes', code.toUpperCase().trim());
  await updateDoc(docRef, { used: true });
}
