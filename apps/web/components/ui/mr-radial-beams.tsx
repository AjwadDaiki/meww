'use client';

/**
 * Radial color beams background — the Tamagotchi signature.
 * DESIGN4.md 0.1: 6-8 saturated wedge rays from slightly off-center point.
 * Implemented via conic-gradient (CSS).
 */

const BEAM_COLORS = [
  'var(--color-mr-rose-tama)',    // #FF5FA2
  'var(--color-mr-jaune-candy)',  // #FFE14B
  'var(--color-mr-cyan-piscine)', // #3EC4E6
  'var(--color-mr-vert-apple)',   // #7FD957
  'var(--color-mr-violet-grape)', // #B565E8
  'var(--color-mr-orange-pop)',   // #FF8C42
  'var(--color-mr-rose-tama)',    // repeat for seamless
  'var(--color-mr-jaune-candy)',  // repeat
];

export function MrRadialBeams() {
  // Build conic-gradient stops: each beam ~45deg
  const stops = BEAM_COLORS.map((color, i) => {
    const startDeg = i * 45;
    const endDeg = (i + 1) * 45;
    return `${color} ${startDeg}deg ${endDeg}deg`;
  }).join(', ');

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `conic-gradient(from 0deg at 45% 40%, ${stops})`,
      }}
      aria-hidden="true"
    >
      {/* Slight radial overlay to soften center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 45% 40%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
