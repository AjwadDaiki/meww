'use client';

import { useState, useEffect } from 'react';

type CategoryDoc = {
  _id: string;
  slug: string;
  section: string;
  name: { fr: string; en: string; es: string };
  family?: string;
  isSignature?: boolean;
};

type ActionModuleProps = {
  value: string;
  onChange: (slug: string) => void;
};

const SECTION_TABS = [
  { key: 'trending', label: 'TRENDING', emoji: '🔥' },
  { key: 'music', label: 'MUSIQUE', emoji: '🎵' },
  { key: 'sports', label: 'SPORT', emoji: '🏀' },
  { key: 'dance', label: 'DANCE', emoji: '💃' },
  { key: 'cinematic', label: 'CINEMA', emoji: '🎬' },
  { key: 'moments', label: 'MOMENTS', emoji: '🎉' },
];

export function ActionModule({ value, onChange }: ActionModuleProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json()).then(setCategories).catch(() => {});
  }, []);

  const selectedCat = categories.find((c) => c.slug === value);
  const filtered = categories.filter((c) => c.section === activeTab);

  return (
    <>
      {/* Module card */}
      <button
        onClick={() => setOpen(true)}
        className="w-[140px] md:w-[160px] bg-mr-papier-gloss border-3 border-mr-noir-encre shadow-[4px_4px_0_var(--color-mr-noir-encre)] p-2 md:p-3 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition-all text-left"
        style={{ transform: 'rotate(1deg)' }}
      >
        <span className="font-[family-name:var(--font-silkscreen)] text-[8px] text-mr-noir-encre/50 uppercase">ACTION</span>
        <p className="font-[family-name:var(--font-playfair)] italic text-sm md:text-base text-mr-noir-encre mt-0.5 truncate">
          {selectedCat?.name.fr || value}
        </p>
        <span className="font-[family-name:var(--font-caveat)] text-[10px] text-mr-cyan-piscine">inclus</span>
      </button>

      {/* Bottom sheet / Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-mr-noir-encre/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full md:w-[600px] max-h-[80vh] bg-mr-papier-gloss border-4 border-mr-noir-encre shadow-[12px_12px_0_var(--color-mr-noir-encre)] rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col">
            <div className="p-3 border-b-2 border-mr-noir-encre/10">
              <h3 className="font-[family-name:var(--font-anton)] text-lg uppercase text-center">CHOISIS UNE ACTION</h3>
            </div>

            {/* Section tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b-2 border-mr-noir-encre/10">
              {SECTION_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 px-3 py-2 font-[family-name:var(--font-silkscreen)] text-[9px] uppercase transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-mr-jaune-candy text-mr-noir-encre border-b-3 border-mr-noir-encre'
                      : 'text-mr-noir-encre/50 hover:text-mr-noir-encre'
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* Category grid */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {filtered.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => { onChange(cat.slug); setOpen(false); }}
                    className={`bg-mr-papier-gloss border-2 p-1 cursor-pointer hover:scale-105 transition-all ${
                      value === cat.slug
                        ? 'border-mr-jaune-candy shadow-[3px_3px_0_var(--color-mr-jaune-candy)]'
                        : 'border-mr-noir-encre/20 hover:border-mr-noir-encre'
                    }`}
                    style={{ transform: `rotate(${(cat.slug.length % 5) - 2}deg)` }}
                  >
                    <div className="w-full aspect-[3/4] bg-mr-noir-encre/5 overflow-hidden mb-1">
                      <video
                        src={`/previews/${cat.slug}.mp4`}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-[family-name:var(--font-playfair)] italic text-[10px] text-mr-noir-encre truncate">
                      {cat.name.fr}
                    </p>
                    {cat.isSignature && (
                      <span className="font-[family-name:var(--font-silkscreen)] text-[7px] text-mr-chrome-gold">SIGNATURE</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
