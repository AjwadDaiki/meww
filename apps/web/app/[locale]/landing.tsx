'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MrRadialBeams } from '@/components/ui/mr-radial-beams';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeBubble } from '@/components/ui/mr-chrome-bubble';
import { MrSticker } from '@/components/stickers/mr-sticker';
import { useFlowStore } from '@/lib/store/flow-store';

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
  { top: '40%', left: '90%', size: 10, color: 'var(--color-mr-jaune-candy)', delay: 1.5 },
  { top: '55%', left: '4%', size: 14, color: 'var(--color-mr-rose-tama)', delay: 0.6 },
  { top: '60%', left: '88%', size: 8, color: '#FFFFFF', delay: 1.0 },
  { top: '70%', left: '10%', size: 10, color: 'var(--color-mr-chrome-gold)', delay: 1.8 },
  { top: '75%', left: '80%', size: 16, color: 'var(--color-mr-violet-grape)', delay: 0.3 },
  { top: '8%', left: '40%', size: 8, color: 'var(--color-mr-jaune-candy)', delay: 2.0 },
  { top: '50%', left: '50%', size: 6, color: '#FFFFFF', delay: 1.4 },
  { top: '85%', left: '15%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 0.9 },
  { top: '88%', left: '70%', size: 10, color: 'var(--color-mr-cyan-piscine)', delay: 1.7 },
  { top: '30%', left: '60%', size: 8, color: 'var(--color-mr-chrome-gold)', delay: 2.2 },
  { top: '45%', left: '20%', size: 14, color: 'var(--color-mr-jaune-candy)', delay: 0.5 },
  { top: '65%', left: '45%', size: 10, color: '#FFFFFF', delay: 1.1 },
  { top: '18%', left: '55%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 1.6 },
  { top: '92%', left: '50%', size: 8, color: 'var(--color-mr-vert-apple)', delay: 0.7 },
  { top: '3%', left: '65%', size: 10, color: 'var(--color-mr-violet-grape)', delay: 2.1 },
];

export function Landing() {
  const t = useTranslations();
  const { currentStep, photoUrl, setUploadResult, setCategory, selectedCategory } = useFlowStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data))
      .catch(() => {});
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

  const handleCTAClick = () => {
    if (currentStep === 'arrival') {
      setShowUploadModal(true);
    }
  };

  const handleCategorySelect = (slug: string) => {
    if (currentStep === 'uploaded') {
      setCategory(slug);
    }
  };

  // Determine CTA text based on step
  const ctaText = currentStep === 'arrival'
    ? t('hero.cta')
    : currentStep === 'uploaded'
    ? t('categories.title')
    : currentStep === 'scene-chosen'
    ? t('preview.cta')
    : t('hero.cta');

  // Determine hero image
  const heroImage = photoUrl || '/pnj/purrpaparazzi-default.png';
  const heroCaption = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name.fr || selectedCategory
    : 'Midnight Porch Musician';

  return (
    <div className="h-dvh w-screen overflow-hidden relative">
      {/* Background */}
      <MrRadialBeams />

      {/* 20 sparkles */}
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
      <div className="absolute top-[60%] left-[40%] z-10"><MrChromeBubble size={22} duration={3} /></div>

      {/* Stickers */}
      <div className="absolute top-[6%] right-[5%] z-30"><MrSticker label="VIRAL!" color="rose" rotation={12} wiggle /></div>
      <div className="absolute top-[18%] left-[2%] z-30 hidden md:block"><MrSticker label="HOT!" color="rouge" rotation={-8} /></div>
      <div className="absolute bottom-[22%] right-[3%] z-30"><MrSticker label="OMG!" color="jaune" rotation={15} wiggle /></div>
      <div className="absolute bottom-[35%] left-[1%] z-30 hidden md:block"><MrSticker label="NEW!" color="cyan" rotation={-12} /></div>
      <div className="absolute top-[45%] right-[2%] z-30 hidden md:block"><MrSticker label="STAR!" color="violet" rotation={6} wiggle /></div>
      <div className="absolute bottom-[8%] left-[30%] z-30 hidden md:block"><MrSticker label="WOW!" color="vert" rotation={-5} /></div>
      <div className="absolute top-[3%] left-[25%] z-30 hidden md:block"><MrSticker label="SLAY!" color="rose" size="sm" rotation={18} /></div>
      <div className="absolute bottom-[15%] right-[25%] z-30 hidden md:block"><MrSticker label="MOOD!" color="orange" size="sm" rotation={-15} /></div>
      <div className="absolute top-[50%] left-[85%] z-30 hidden lg:block"><MrSticker label="ICONIC!" color="chrome" rotation={-3} /></div>
      <div className="absolute bottom-[5%] right-[45%] z-30 hidden lg:block"><MrSticker label="LIVE!" color="rouge" size="sm" rotation={20} wiggle /></div>

      {/* Main layout */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-2 md:py-3 flex-shrink-0">
          <span className="chrome-text font-[family-name:var(--font-orbitron)] text-lg md:text-xl">MEOWREEL</span>
          <span className="font-[family-name:var(--font-silkscreen)] text-[9px] md:text-[10px] text-mr-noir-encre/60">
            EDITION #47 &middot; APRIL 2026
          </span>
        </header>

        {/* Main stage */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 px-4 md:px-8 min-h-0">
          {/* PNJ left */}
          <div className="hidden md:block flex-shrink-0 self-end mb-8" style={{ animation: 'bubble-float 3s ease-in-out infinite' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pnj/catsome-default.png" alt="" width={100} height={120} className="drop-shadow-lg" />
          </div>

          {/* Center */}
          <div className="flex flex-col items-center gap-2 md:gap-3 min-h-0 max-w-md">
            {/* Polaroid */}
            <div
              className="relative bg-mr-papier-gloss p-2 md:p-3 shadow-[8px_8px_0_var(--color-mr-noir-encre)] flex-shrink-0"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <div className="w-[200px] h-[240px] md:w-[280px] md:h-[340px] bg-mr-noir-encre/10 overflow-hidden relative">
                {photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <video
                    src="/previews/midnight-porch-musician.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="font-[family-name:var(--font-playfair)] italic text-sm md:text-base text-center mt-1 text-mr-noir-encre">
                {heroCaption}
              </p>
              <div className="absolute -top-3 -right-3">
                <MrSticker label={currentStep === 'uploaded' ? 'NEW!' : 'HOT!'} color={currentStep === 'uploaded' ? 'cyan' : 'rouge'} size="sm" rotation={15} />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-anton)] text-[clamp(1.8rem,8vw,4.5rem)] uppercase leading-[0.85]">
                <span className="text-mr-papier-gloss [-webkit-text-stroke:2px_var(--color-mr-noir-encre)] md:[-webkit-text-stroke:3px_var(--color-mr-noir-encre)]" style={{ paintOrder: 'stroke fill' }}>
                  {t('hero.title')}
                </span>
                <br />
                <span className="title-pop">{t('hero.titleAccent')}</span>
              </h1>
              <p
                className="font-[family-name:var(--font-permanent-marker)] text-base md:text-2xl text-mr-rouge-cerise mt-1"
                style={{ transform: 'rotate(-3deg)' }}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleCTAClick}
              className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-full px-6 py-3 md:px-10 md:py-4 font-[family-name:var(--font-anton)] text-sm md:text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-noir-encre)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-noir-encre)] transition-all cursor-pointer flex-shrink-0"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {ctaText}
            </button>

            <p className="font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[10px] text-mr-noir-encre/50 text-center">
              {t('hero.socialProof')}
            </p>
          </div>

          {/* PNJ right */}
          <div className="hidden md:block flex-shrink-0 self-start mt-12" style={{ animation: 'bubble-float 4s ease-in-out infinite', animationDelay: '1s' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pnj/glameow-default.png" alt="" width={90} height={110} className="drop-shadow-lg" />
          </div>
        </div>

        {/* Category carousel */}
        <div className="flex-shrink-0 px-2 md:px-8 pb-3 md:pb-4">
          <div className="relative">
            <div className="hidden md:block absolute -left-2 bottom-0 z-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/djmiaou-default.png" alt="" width={60} height={72} className="drop-shadow-md" />
            </div>
            <div className="hidden md:block absolute -right-2 bottom-0 z-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/chaupion-default.png" alt="" width={60} height={72} className="drop-shadow-md" />
            </div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-8 md:px-16 pb-2 snap-x snap-mandatory">
              {(categories.length > 0 ? categories.slice(0, 12) : Array.from({ length: 6 }, (_, i) => ({
                _id: String(i), slug: `placeholder-${i}`, section: 'trending',
                name: { fr: `Scene ${i + 1}`, en: `Scene ${i + 1}`, es: `Escena ${i + 1}` },
                tagline: { fr: '', en: '', es: '' },
              }))).map((cat, i) => (
                <div
                  key={cat._id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`flex-shrink-0 snap-center bg-mr-papier-gloss p-1.5 md:p-2 shadow-[4px_4px_0_var(--color-mr-noir-encre)] cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all ${
                    selectedCategory === cat.slug ? 'ring-4 ring-mr-jaune-candy scale-105' : ''
                  } ${currentStep === 'arrival' ? 'opacity-60' : ''}`}
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + (i % 4))}deg)` }}
                >
                  <div className="w-[90px] h-[110px] md:w-[120px] md:h-[150px] bg-mr-noir-encre/10 overflow-hidden">
                    <video
                      src={`/previews/${cat.slug}.mp4`}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] italic text-[9px] md:text-xs text-center mt-0.5 text-mr-noir-encre truncate max-w-[90px] md:max-w-[120px]">
                    {cat.name.fr}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[9px] text-mr-noir-encre/40 mt-1">
              SCENE 1 / {categories.length || 42}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile PNJ */}
      <div className="md:hidden absolute bottom-[130px] left-1 z-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pnj/catsome-default.png" alt="" width={45} height={55} className="drop-shadow-md" />
      </div>
      <div className="md:hidden absolute bottom-[130px] right-1 z-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pnj/glameow-default.png" alt="" width={40} height={50} className="drop-shadow-md" />
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
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-xl px-6 py-4 font-[family-name:var(--font-anton)] text-lg uppercase shadow-[6px_6px_0_var(--color-mr-noir-encre)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  {t('upload.gallery')}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-mr-rose-tama text-mr-papier-gloss border-4 border-mr-noir-encre rounded-xl px-6 py-4 font-[family-name:var(--font-anton)] text-lg uppercase shadow-[6px_6px_0_var(--color-mr-noir-encre)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  {t('upload.camera')}
                </button>
              </div>
            )}

            <p className="font-[family-name:var(--font-silkscreen)] text-[9px] text-mr-noir-encre/40 text-center mt-3">
              {t('upload.hint')}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}
