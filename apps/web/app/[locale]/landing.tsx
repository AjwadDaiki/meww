'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MrRadialBeams } from '@/components/ui/mr-radial-beams';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeBubble } from '@/components/ui/mr-chrome-bubble';
import { MrSticker } from '@/components/stickers/mr-sticker';
import { useFlowStore } from '@/lib/store/flow-store';
import { StudioLayout } from '@/components/studio/studio-layout';

type CategoryDoc = {
  _id: string;
  slug: string;
  section: string;
  name: { fr: string; en: string; es: string };
  tagline: { fr: string; en: string; es: string };
};

const SPARKLES = [
  { top: '5%', left: '8%', size: 14, color: 'var(--color-mr-jaune-candy)', delay: 0 },
  { top: '10%', left: '85%', size: 10, color: 'var(--color-mr-rose-tama)', delay: 0.4 },
  { top: '22%', left: '3%', size: 8, color: '#FFFFFF', delay: 0.8 },
  { top: '15%', left: '92%', size: 16, color: 'var(--color-mr-chrome-gold)', delay: 1.2 },
  { top: '35%', left: '6%', size: 12, color: 'var(--color-mr-cyan-piscine)', delay: 0.2 },
  { top: '55%', left: '4%', size: 14, color: 'var(--color-mr-rose-tama)', delay: 0.6 },
  { top: '70%', left: '10%', size: 10, color: 'var(--color-mr-chrome-gold)', delay: 1.8 },
  { top: '75%', left: '80%', size: 16, color: 'var(--color-mr-violet-grape)', delay: 0.3 },
  { top: '8%', left: '40%', size: 8, color: 'var(--color-mr-jaune-candy)', delay: 2.0 },
  { top: '85%', left: '15%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 0.9 },
  { top: '88%', left: '70%', size: 10, color: 'var(--color-mr-cyan-piscine)', delay: 1.7 },
  { top: '45%', left: '20%', size: 14, color: 'var(--color-mr-jaune-candy)', delay: 0.5 },
  { top: '18%', left: '55%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 1.6 },
  { top: '3%', left: '65%', size: 10, color: 'var(--color-mr-violet-grape)', delay: 2.1 },
];

// Scrapbook positions for scattered polaroids (desktop right side)
const SCATTER_POSITIONS = [
  { top: '3%', left: '8%', rot: -6 },
  { top: '5%', left: '58%', rot: 5 },
  { top: '28%', left: '18%', rot: 8 },
  { top: '22%', left: '62%', rot: -4 },
  { top: '50%', left: '5%', rot: -7 },
  { top: '48%', left: '55%', rot: 6 },
  { top: '72%', left: '12%', rot: 3 },
  { top: '70%', left: '60%', rot: -5 },
];

export function Landing() {
  const t = useTranslations();
  const { currentStep, setUploadResult } = useFlowStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json()).then(setCategories).catch(() => {});
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('locale', 'fr');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setUploadResult(data.orderId, data.shortId, data.photoUrl);
      setShowUploadModal(false);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, [setUploadResult]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  // Hero video (random on load)
  const heroVideos = [
    { src: '/previews/midnight-porch-musician.mp4', caption: 'Midnight Porch Musician' },
    { src: '/previews/football-goal-celebration.mp4', caption: 'Football Goal' },
    { src: '/previews/disco-70s.mp4', caption: 'Disco 70s' },
    { src: '/previews/cowboy-far-west.mp4', caption: 'Cowboy Far West' },
    { src: '/previews/tiktok-dance-trend.mp4', caption: 'TikTok Dance' },
    { src: '/previews/ninja-night-tokyo.mp4', caption: 'Ninja Night' },
  ];
  const [heroIdx] = useState(() => Math.floor(Math.random() * heroVideos.length));
  const heroVideo = heroVideos[heroIdx];

  // After upload -> Studio
  if (currentStep !== 'arrival') {
    return <StudioLayout />;
  }

  const previewCats = categories.slice(0, 8);

  return (
    <div className="h-dvh w-screen overflow-hidden relative">
      <MrRadialBeams />

      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <div key={i} className="absolute z-10 pointer-events-none" style={{ top: s.top, left: s.left }}>
          <MrSparkle size={s.size} color={s.color} delay={s.delay} duration={2 + (i % 3)} />
        </div>
      ))}

      {/* Chrome bubbles */}
      <div className="absolute top-[12%] left-[15%] z-10"><MrChromeBubble size={35} duration={4} /></div>
      <div className="absolute top-[25%] right-[10%] z-10"><MrChromeBubble size={50} duration={5} /></div>
      <div className="absolute bottom-[20%] left-[8%] z-10"><MrChromeBubble size={28} duration={3.5} /></div>
      <div className="absolute bottom-[30%] right-[15%] z-10"><MrChromeBubble size={42} duration={4.5} /></div>

      {/* Stickers */}
      <div className="absolute top-[6%] right-[5%] z-30"><MrSticker label="VIRAL!" color="rose" rotation={12} wiggle /></div>
      <div className="absolute bottom-[22%] right-[3%] z-30"><MrSticker label="OMG!" color="jaune" rotation={15} wiggle /></div>
      <div className="absolute top-[3%] left-[25%] z-30 hidden md:block"><MrSticker label="SLAY!" color="rose" size="sm" rotation={18} /></div>
      <div className="absolute bottom-[8%] left-[2%] z-30 hidden md:block"><MrSticker label="WOW!" color="vert" rotation={-5} /></div>

      {/* Main: 2 columns desktop, stacked mobile */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-2 flex-shrink-0">
          <span className="chrome-text font-[family-name:var(--font-orbitron)] text-lg md:text-xl">MEOWREEL</span>
          <span className="font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[10px] text-mr-noir-encre/50">
            EDITION #47 &middot; APRIL 2026
          </span>
        </header>

        {/* Content: LEFT hero + RIGHT scattered previews */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 px-3 md:px-6 gap-2 md:gap-0">

          {/* LEFT: Hero + Title + CTA */}
          <div className="md:w-[45%] flex flex-col items-center md:items-start justify-center gap-2 md:gap-3 relative">
            {/* PNJ Catsome */}
            <div className="hidden md:block absolute -left-2 top-[10%]" style={{ animation: 'bubble-float 3s ease-in-out infinite' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/catsome-default.png" alt="" width={70} height={84} className="drop-shadow-lg" />
            </div>

            {/* Hero polaroid */}
            <div
              className="relative bg-mr-papier-gloss p-1.5 md:p-3 shadow-[8px_8px_0_var(--color-mr-noir-encre)]"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <div className="w-[160px] h-[200px] md:w-[280px] md:h-[340px] bg-mr-noir-encre/10 overflow-hidden">
                <video src={heroVideo.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-playfair)] italic text-xs md:text-base text-center mt-1 text-mr-noir-encre">
                {heroVideo.caption}
              </p>
              <div className="absolute -top-3 -right-3">
                <MrSticker label="HOT!" color="rouge" size="sm" rotation={15} />
              </div>
            </div>

            {/* Title */}
            <div className="text-center md:text-left">
              <h1 className="font-[family-name:var(--font-anton)] text-[clamp(1.5rem,6vw,3.5rem)] uppercase leading-[0.85]">
                <span className="text-mr-papier-gloss [-webkit-text-stroke:2px_var(--color-mr-noir-encre)] md:[-webkit-text-stroke:3px_var(--color-mr-noir-encre)]" style={{ paintOrder: 'stroke fill' }}>
                  {t('hero.title')}
                </span>
                <br />
                <span className="title-pop">{t('hero.titleAccent')}</span>
              </h1>
              <p className="font-[family-name:var(--font-permanent-marker)] text-sm md:text-xl text-mr-rouge-cerise mt-1" style={{ transform: 'rotate(-3deg)' }}>
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-full px-5 py-2.5 md:px-10 md:py-4 font-[family-name:var(--font-anton)] text-sm md:text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-noir-encre)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-noir-encre)] transition-all cursor-pointer"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {t('hero.cta')}
            </button>

            <p className="font-[family-name:var(--font-silkscreen)] text-[7px] md:text-[9px] text-mr-noir-encre/40">
              {t('hero.socialProof')}
            </p>
          </div>

          {/* RIGHT: Scattered polaroid previews (scrapbook) */}
          <div className="md:w-[55%] relative flex-1 min-h-[180px] md:min-h-0">
            {previewCats.map((cat, i) => {
              const pos = SCATTER_POSITIONS[i % SCATTER_POSITIONS.length];
              return (
                <div
                  key={cat._id}
                  className="absolute bg-mr-papier-gloss p-1 md:p-1.5 shadow-[4px_4px_0_var(--color-mr-noir-encre)] cursor-pointer hover:scale-110 hover:z-50 transition-all duration-200"
                  style={{ top: pos.top, left: pos.left, transform: `rotate(${pos.rot}deg)`, zIndex: 10 + i }}
                >
                  <div className="w-[65px] h-[80px] md:w-[120px] md:h-[148px] bg-mr-noir-encre/10 overflow-hidden">
                    <video src={`/previews/${cat.slug}.mp4`} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] italic text-[6px] md:text-[10px] text-center mt-0.5 text-mr-noir-encre truncate max-w-[65px] md:max-w-[120px]">
                    {cat.name.fr}
                  </p>
                </div>
              );
            })}

            {/* PNJ in scattered area */}
            <div className="hidden md:block absolute bottom-[8%] right-[5%] z-20" style={{ animation: 'bubble-float 4s ease-in-out infinite', animationDelay: '1s' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/glameow-default.png" alt="" width={65} height={78} className="drop-shadow-md" />
            </div>
            <div className="hidden md:block absolute top-[35%] right-[3%] z-20" style={{ animation: 'bubble-float 3.5s ease-in-out infinite' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/djmiaou-default.png" alt="" width={50} height={60} className="drop-shadow-md" />
            </div>

            {/* Scene counter */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
              <p className="font-[family-name:var(--font-silkscreen)] text-[7px] text-mr-noir-encre/30">
                {categories.length || 59} SCENES
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile PNJ */}
      <div className="md:hidden absolute top-[14%] left-1 z-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pnj/catsome-default.png" alt="" width={35} height={42} className="drop-shadow-md" />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-mr-noir-encre/60 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative z-10 w-full md:w-auto md:min-w-[400px] bg-mr-papier-gloss border-4 border-mr-noir-encre shadow-[12px_12px_0_var(--color-mr-noir-encre)] p-6 md:rounded-2xl rounded-t-2xl">
            <h2 className="font-[family-name:var(--font-anton)] text-2xl uppercase text-center mb-4">
              {t('upload.dropzone.default')}
            </h2>
            {uploading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-mr-rose-tama border-t-transparent rounded-full animate-spin" />
                <p className="font-[family-name:var(--font-caveat)] text-lg text-mr-noir-encre/60 mt-2">
                  {t('upload.dropzone.uploading')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={() => fileInputRef.current?.click()} className="w-full bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-xl px-6 py-4 font-[family-name:var(--font-anton)] text-lg uppercase shadow-[6px_6px_0_var(--color-mr-noir-encre)] hover:scale-[1.02] transition-all cursor-pointer">
                  {t('upload.gallery')}
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="w-full bg-mr-rose-tama text-mr-papier-gloss border-4 border-mr-noir-encre rounded-xl px-6 py-4 font-[family-name:var(--font-anton)] text-lg uppercase shadow-[6px_6px_0_var(--color-mr-noir-encre)] hover:scale-[1.02] transition-all cursor-pointer">
                  {t('upload.camera')}
                </button>
              </div>
            )}
            <p className="font-[family-name:var(--font-silkscreen)] text-[9px] text-mr-noir-encre/40 text-center mt-3">
              {t('upload.hint')}
            </p>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={handleFileSelect} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
}
