'use client';

/**
 * Background multichrome anime — 4 couches :
 * 1. Base radial gradient (pastel sature, smooth transitions)
 * 2. Blobs flous flottants (5-6, animated translate 20-30s)
 * 3. Sparkles (handled separately by parent)
 * 4. Grain noise (handled by body class grain-overlay)
 */

export function MrRadialBeams() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Base gradient — pastel sature, smooth, breathing */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, #FFE5F0 0%, #FFC1D8 25%, #B8E0FF 50%, #E0D5FF 75%, #D5F5E8 100%)',
        }}
      />

      {/* Layer 2: Floating blobs — large, blurred, animated */}
      {/* Rose shocking */}
      <div
        className="absolute rounded-full"
        style={{
          top: '5%',
          left: '-5%',
          width: 400,
          height: 400,
          background: '#FF5FA2',
          filter: 'blur(120px)',
          opacity: 0.4,
          animation: 'blobFloat1 22s ease-in-out infinite',
        }}
      />
      {/* Cyan pool */}
      <div
        className="absolute rounded-full"
        style={{
          top: '-10%',
          right: '-5%',
          width: 450,
          height: 450,
          background: '#3EC4E6',
          filter: 'blur(120px)',
          opacity: 0.35,
          animation: 'blobFloat2 28s ease-in-out infinite',
        }}
      />
      {/* Jaune candy */}
      <div
        className="absolute rounded-full"
        style={{
          top: '35%',
          left: '30%',
          width: 350,
          height: 350,
          background: '#FFD93D',
          filter: 'blur(130px)',
          opacity: 0.3,
          animation: 'blobFloat3 25s ease-in-out infinite',
        }}
      />
      {/* Violet grape */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: '-5%',
          left: '10%',
          width: 380,
          height: 380,
          background: '#B565E8',
          filter: 'blur(120px)',
          opacity: 0.35,
          animation: 'blobFloat4 20s ease-in-out infinite',
        }}
      />
      {/* Orange pop */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: '5%',
          right: '0%',
          width: 320,
          height: 320,
          background: '#FF8C42',
          filter: 'blur(120px)',
          opacity: 0.3,
          animation: 'blobFloat5 24s ease-in-out infinite',
        }}
      />
      {/* Mint green */}
      <div
        className="absolute rounded-full"
        style={{
          top: '60%',
          left: '50%',
          width: 280,
          height: 280,
          background: '#65E6B8',
          filter: 'blur(110px)',
          opacity: 0.25,
          animation: 'blobFloat1 30s ease-in-out infinite',
          animationDelay: '5s',
        }}
      />
    </div>
  );
}
