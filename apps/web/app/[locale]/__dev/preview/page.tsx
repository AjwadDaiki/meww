export default function PreviewPage() {
  const COLORS = [
    { name: 'pink-shock', var: '--color-mr-pink-shock' },
    { name: 'pink-bubblegum', var: '--color-mr-pink-bubblegum' },
    { name: 'yellow-fluo', var: '--color-mr-yellow-fluo' },
    { name: 'yellow-canary', var: '--color-mr-yellow-canary' },
    { name: 'cyan-pool', var: '--color-mr-cyan-pool' },
    { name: 'cyan-electric', var: '--color-mr-cyan-electric' },
    { name: 'green-apple', var: '--color-mr-green-apple' },
    { name: 'green-mint', var: '--color-mr-green-mint' },
    { name: 'red-tomato', var: '--color-mr-red-tomato' },
    { name: 'orange-neon', var: '--color-mr-orange-neon' },
    { name: 'purple-grape', var: '--color-mr-purple-grape' },
    { name: 'lavender-pop', var: '--color-mr-lavender-pop' },
  ];

  const PAPERS = [
    { name: 'paper-aged', var: '--color-mr-paper-aged' },
    { name: 'paper-white', var: '--color-mr-paper-white' },
    { name: 'paper-cream', var: '--color-mr-paper-cream' },
    { name: 'paper-kraft', var: '--color-mr-paper-kraft' },
    { name: 'paper-stain', var: '--color-mr-paper-stain' },
  ];

  return (
    <div className="h-dvh overflow-y-auto bg-mr-paper-aged p-6 space-y-12">
      {/* Palette */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          Palette: Pop Acide 2001
        </h2>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="w-16 h-16 border-3 border-mr-black-ink shadow-[4px_4px_0_var(--color-mr-black-ink)]"
                style={{ backgroundColor: `var(${c.var})` }}
              />
              <p className="mt-1 font-[family-name:var(--font-pixel)] text-[8px] text-mr-black-ink">
                {c.name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {PAPERS.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="w-16 h-16 border-3 border-mr-black-ink shadow-[4px_4px_0_var(--color-mr-black-ink)]"
                style={{ backgroundColor: `var(${c.var})` }}
              />
              <p className="mt-1 font-[family-name:var(--font-pixel)] text-[8px] text-mr-black-ink">
                {c.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonts */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          Typography
        </h2>
        <div className="space-y-4 bg-mr-paper-white p-4 border-3 border-mr-black-ink shadow-[6px_6px_0_var(--color-mr-black-ink)]">
          <p className="font-[family-name:var(--font-anton)] text-5xl uppercase text-mr-black-ink">
            Anton Tabloid Bold
          </p>
          <p className="font-[family-name:var(--font-playfair)] text-4xl italic text-mr-black-ink">
            Playfair Display Italic
          </p>
          <p className="font-[family-name:var(--font-caveat)] text-3xl text-mr-ink-blue">
            Caveat Handwritten Annotations
          </p>
          <p className="font-[family-name:var(--font-permanent-marker)] text-3xl text-mr-pink-shock">
            Permanent Marker Stickers
          </p>
          <p className="font-[family-name:var(--font-silkscreen)] text-xl text-mr-black-ink">
            Silkscreen Pixel Stats
          </p>
          <p className="font-[family-name:var(--font-orbitron)] text-xl text-mr-black-ink">
            Orbitron Chrome Tech
          </p>
          <p className="font-[family-name:var(--font-inter)] text-lg text-mr-black-ink">
            Inter Body Text (rare usage)
          </p>
        </div>
      </section>

      {/* Text Effects */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          Text Effects
        </h2>
        <div className="space-y-6">
          <div className="bg-mr-paper-cream p-6 border-3 border-mr-black-ink shadow-[6px_6px_0_var(--color-mr-black-ink)]">
            <h3 className="title-pop font-[family-name:var(--font-anton)] text-6xl uppercase">
              STAR
            </h3>
            <p className="font-[family-name:var(--font-pixel)] text-[10px] text-mr-black-ink/60 mt-2">
              .title-pop (outline thick + shadow offset)
            </p>
          </div>

          <div className="bg-mr-black-ink p-6 border-3 border-mr-yellow-fluo shadow-[6px_6px_0_var(--color-mr-yellow-fluo)]">
            <h3 className="chrome-text font-[family-name:var(--font-orbitron)] text-4xl">
              MEOWREEL
            </h3>
            <p className="font-[family-name:var(--font-pixel)] text-[10px] text-mr-paper-aged/60 mt-2">
              .chrome-text (3D metallic gradient)
            </p>
          </div>

          <div className="bg-mr-paper-white p-6 border-3 border-mr-black-ink shadow-[6px_6px_0_var(--color-mr-black-ink)]">
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-mr-black-ink">
              The cat became a <span className="highlighter">viral sensation</span> overnight
            </p>
            <p className="font-[family-name:var(--font-pixel)] text-[10px] text-mr-black-ink/60 mt-2">
              .highlighter (yellow fluo underline)
            </p>
          </div>
        </div>
      </section>

      {/* Torn edges */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          Torn Paper Effect
        </h2>
        <div className="torn-edges bg-mr-paper-white p-8 shadow-[8px_8px_0_var(--color-mr-black-ink)]" style={{ transform: 'rotate(-2deg)' }}>
          <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-mr-black-ink">
            This element has torn paper edges via clip-path
          </p>
        </div>
      </section>

      {/* CTA Preview */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          CTA Styles
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            className="animate-cta-pulse bg-mr-yellow-fluo text-mr-black-ink border-4 border-mr-black-ink rounded-full px-8 py-4 font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-black-ink)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-black-ink)] transition-all cursor-pointer"
            style={{ transform: 'rotate(-1deg)' }}
          >
            UPLOAD TON CHAT 0,99EUR
          </button>
          <button
            className="bg-mr-pink-shock text-mr-paper-white border-4 border-mr-black-ink rounded-full px-8 py-4 font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-black-ink)] hover:scale-105 transition-all cursor-pointer"
          >
            SECONDARY CTA
          </button>
        </div>
      </section>

      {/* Sticker Preview */}
      <section>
        <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4 text-mr-black-ink">
          Sticker Styles
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          {[
            { text: 'VIRAL!', color: 'var(--color-mr-pink-shock)', rot: -8 },
            { text: 'OMG!', color: 'var(--color-mr-yellow-fluo)', rot: 12 },
            { text: 'HOT!', color: 'var(--color-mr-red-tomato)', rot: -5 },
            { text: 'NEW!', color: 'var(--color-mr-cyan-electric)', rot: 7 },
            { text: 'STAR!', color: 'var(--color-mr-purple-grape)', rot: -12 },
            { text: 'WOW!', color: 'var(--color-mr-green-apple)', rot: 3 },
            { text: 'SLAY!', color: 'var(--color-mr-pink-bubblegum)', rot: -10 },
            { text: 'ICONIC!', color: 'var(--color-mr-chrome-gold)', rot: 6 },
            { text: 'MOOD!', color: 'var(--color-mr-orange-neon)', rot: -3 },
            { text: 'LIVE!', color: 'var(--color-mr-red-tomato)', rot: 15 },
          ].map((s) => (
            <span
              key={s.text}
              className="inline-block font-[family-name:var(--font-permanent-marker)] text-lg px-3 py-1 border-4 border-mr-black-ink shadow-[3px_3px_0_var(--color-mr-black-ink)]"
              style={{ backgroundColor: s.color, transform: `rotate(${s.rot}deg)`, color: s.rot > 5 ? 'var(--color-mr-black-ink)' : 'var(--color-mr-paper-white)' }}
            >
              {s.text}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
