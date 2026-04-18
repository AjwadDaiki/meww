'use client';

import { MrBlob } from './mr-blob';
import { MrSparkle } from './mr-sparkle';

const SPARKLES = [
  { size: 8, color: 'var(--color-mr-yellow-gold)', top: '8%', left: '15%', delay: 0, duration: 2.5 },
  { size: 14, color: 'var(--color-mr-white-pure)', top: '12%', left: '75%', delay: 0.8, duration: 3 },
  { size: 6, color: 'var(--color-mr-pink-hot)', top: '25%', left: '90%', delay: 1.5, duration: 2 },
  { size: 10, color: 'var(--color-mr-cyan-dream)', top: '35%', left: '5%', delay: 0.3, duration: 2.8 },
  { size: 12, color: 'var(--color-mr-yellow-pop)', top: '45%', left: '85%', delay: 1.2, duration: 2.2 },
  { size: 8, color: 'var(--color-mr-white-pure)', top: '55%', left: '20%', delay: 2, duration: 3.5 },
  { size: 16, color: 'var(--color-mr-yellow-gold)', top: '65%', left: '60%', delay: 0.5, duration: 2.6 },
  { size: 6, color: 'var(--color-mr-pink-soft)', top: '72%', left: '35%', delay: 1.8, duration: 2 },
  { size: 10, color: 'var(--color-mr-cyan-dream)', top: '80%', left: '70%', delay: 0.7, duration: 3.2 },
  { size: 8, color: 'var(--color-mr-white-pure)', top: '88%', left: '10%', delay: 1, duration: 2.4 },
  { size: 12, color: 'var(--color-mr-yellow-gold)', top: '15%', left: '45%', delay: 2.2, duration: 2.8 },
  { size: 6, color: 'var(--color-mr-pink-hot)', top: '92%', left: '55%', delay: 0.4, duration: 3 },
  { size: 10, color: 'var(--color-mr-white-pure)', top: '50%', left: '50%', delay: 1.6, duration: 2.5 },
  { size: 14, color: 'var(--color-mr-yellow-pop)', top: '5%', left: '55%', delay: 0.9, duration: 3.2 },
  { size: 8, color: 'var(--color-mr-cyan-dream)', top: '40%', left: '25%', delay: 2.5, duration: 2 },
];

export function MrBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Animated gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FF3EA5 0%, #FFB8D9 25%, #B8A5E3 50%, #FFA07A 75%, #FF3EA5 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-pulse 8s ease infinite',
        }}
      />

      {/* Layer 2: Blobs */}
      <MrBlob color="#FF3EA5" size={400} className="top-[-10%] left-[-5%]" duration={22} />
      <MrBlob color="#7DDFFB" size={350} className="top-[30%] right-[-10%]" duration={18} />
      <MrBlob color="#FFED4A" size={300} className="bottom-[10%] left-[20%]" duration={25} />
      <MrBlob color="#6B3FA0" size={280} className="top-[60%] left-[60%]" duration={20} />

      {/* Layer 3: Sparkles */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left }}
        >
          <MrSparkle
            size={s.size}
            color={s.color}
            delay={s.delay}
            duration={s.duration}
          />
        </div>
      ))}
    </div>
  );
}
