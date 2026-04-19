'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { MrRadialBeams } from '@/components/ui/mr-radial-beams';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeBubble } from '@/components/ui/mr-chrome-bubble';
import { MrSticker } from '@/components/stickers/mr-sticker';
import { useFlowStore } from '@/lib/store/flow-store';
import { StudioLayout } from '@/components/studio/studio-layout';

type CategoryDoc = { _id: string; slug: string; section: string; name: { fr: string; en: string; es: string } };

const SPARKLES = [
  { top: '4%', left: '12%', size: 14, color: '#FFD840', delay: 0 },
  { top: '8%', left: '78%', size: 10, color: '#FF5FA2', delay: 0.4 },
  { top: '20%', left: '5%', size: 8, color: '#FFFFFF', delay: 0.8 },
  { top: '14%', left: '88%', size: 16, color: '#FFD840', delay: 1.2 },
  { top: '32%', left: '8%', size: 12, color: '#3EC4E6', delay: 0.2 },
  { top: '50%', left: '6%', size: 14, color: '#FF5FA2', delay: 0.6 },
  { top: '65%', left: '12%', size: 10, color: '#FFD840', delay: 1.8 },
  { top: '72%', left: '75%', size: 16, color: '#B565E8', delay: 0.3 },
  { top: '6%', left: '45%', size: 8, color: '#FFD840', delay: 2.0 },
  { top: '82%', left: '18%', size: 12, color: '#FF5FA2', delay: 0.9 },
  { top: '85%', left: '65%', size: 10, color: '#3EC4E6', delay: 1.7 },
  { top: '40%', left: '22%', size: 14, color: '#FFD840', delay: 0.5 },
  { top: '16%', left: '52%', size: 12, color: '#FF5FA2', delay: 1.6 },
  { top: '3%', left: '62%', size: 10, color: '#B565E8', delay: 2.1 },
  { top: '58%', left: '92%', size: 8, color: '#FFFFFF', delay: 1.1 },
  { top: '45%', left: '48%', size: 6, color: '#FFD840', delay: 2.3 },
  { top: '28%', left: '72%', size: 12, color: '#3EC4E6', delay: 0.7 },
  { top: '90%', left: '40%', size: 8, color: '#FF5FA2', delay: 1.3 },
  { top: '38%', left: '95%', size: 10, color: '#FFFFFF', delay: 1.9 },
  { top: '75%', left: '5%', size: 14, color: '#FFD840', delay: 2.5 },
];

const SCATTER = [
  { top: '2%', left: '5%', rot: -7, w: 150, h: 185 },
  { top: '1%', left: '50%', rot: 5, w: 165, h: 200 },
  { top: '26%', left: '20%', rot: 9, w: 140, h: 172 },
  { top: '22%', left: '60%', rot: -4, w: 158, h: 194 },
  { top: '48%', left: '3%', rot: -8, w: 148, h: 182 },
  { top: '46%', left: '52%', rot: 6, w: 155, h: 190 },
  { top: '70%', left: '14%', rot: 4, w: 142, h: 175 },
  { top: '68%', left: '56%', rot: -6, w: 160, h: 196 },
];

const HERO_VIDEOS = [
  { src: '/previews/midnight-porch-musician.mp4', caption: 'Midnight Porch Musician' },
  { src: '/previews/football-goal-celebration.mp4', caption: 'Football Goal' },
  { src: '/previews/disco-70s.mp4', caption: 'Disco 70s' },
  { src: '/previews/cowboy-far-west.mp4', caption: 'Cowboy Far West' },
  { src: '/previews/ninja-night-tokyo.mp4', caption: 'Ninja Night' },
  { src: '/previews/jazz-trumpet.mp4', caption: 'Jazz Trumpet' },
];

export function Landing() {
  const t = useTranslations();
  const { currentStep, setUploadResult } = useFlowStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [showGuideArrow, setShowGuideArrow] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json()).then(setCategories).catch(() => {});
    const t = setTimeout(() => setShowGuideArrow(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('locale', 'fr');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      setUploadResult(data.orderId, data.shortId, data.photoUrl);
      setShowUploadModal(false);
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  }, [setUploadResult]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const [heroIdx] = useState(() => Math.floor(Math.random() * HERO_VIDEOS.length));
  const heroVideo = HERO_VIDEOS[heroIdx];

  if (currentStep !== 'arrival') return <StudioLayout />;

  const previewCats = categories.slice(0, 8);

  return (
    <div className="h-dvh w-screen overflow-hidden relative">
      <MrRadialBeams />

      {/* 20 sparkles */}
      {SPARKLES.map((s, i) => (
        <div key={i} className="absolute z-[5] pointer-events-none" style={{ top: s.top, left: s.left }}>
          <MrSparkle size={s.size} color={s.color} delay={s.delay} duration={2 + (i % 3)} />
        </div>
      ))}

      {/* 6 chrome bubbles */}
      <div className="absolute top-[10%] left-[18%] z-[5]"><MrChromeBubble size={28} duration={4} /></div>
      <div className="absolute top-[30%] right-[12%] z-[5]"><MrChromeBubble size={40} duration={5} /></div>
      <div className="absolute bottom-[18%] left-[10%] z-[5]"><MrChromeBubble size={22} duration={3.5} /></div>
      <div className="absolute bottom-[25%] right-[18%] z-[5]"><MrChromeBubble size={35} duration={4.5} /></div>
      <div className="absolute top-[55%] left-[42%] z-[5]"><MrChromeBubble size={18} duration={3} /></div>
      <div className="absolute top-[8%] right-[35%] z-[5]"><MrChromeBubble size={24} duration={5.5} /></div>

      {/* 10 stickers scattered */}
      <div className="absolute top-[5%] right-[6%] z-30"><MrSticker label="VIRAL!" color="rose" rotation={12} wiggle /></div>
      <div className="absolute bottom-[25%] right-[4%] z-30"><MrSticker label="OMG!" color="jaune" rotation={15} wiggle /></div>
      <div className="absolute top-[4%] left-[28%] z-30 hidden md:block"><MrSticker label="SLAY!" color="rose" size="sm" rotation={18} /></div>
      <div className="absolute bottom-[6%] left-[4%] z-30 hidden md:block"><MrSticker label="WOW!" color="vert" rotation={-5} /></div>
      <div className="absolute top-[55%] right-[3%] z-30 hidden md:block"><MrSticker label="NEW!" color="cyan" rotation={-10} /></div>
      <div className="absolute top-[35%] left-[3%] z-30 hidden md:block"><MrSticker label="MAGIQUE!" color="violet" size="sm" rotation={8} /></div>
      <div className="absolute bottom-[40%] left-[2%] z-30 hidden md:block"><MrSticker label="FUN!" color="orange" size="sm" rotation={-14} /></div>
      <div className="absolute top-[75%] right-[8%] z-30 hidden md:block"><MrSticker label="IA" color="chrome" rotation={5} /></div>
      {/* Price sticker */}
      <div className="absolute top-[18%] left-[3%] z-30">
        <span
          className="inline-block font-[family-name:var(--font-permanent-marker)] text-lg md:text-xl text-mr-rouge-cerise underline decoration-2 decoration-mr-rouge-cerise"
          style={{ transform: 'rotate(-8deg)' }}
        >
          0,99EUR !
        </span>
      </div>

      {/* Handwritten annotations scattered */}
      <div className="absolute top-[88%] left-[55%] z-[8] hidden md:block pointer-events-none">
        <span className="font-[family-name:var(--font-caveat)] text-sm text-mr-noir-encre/20" style={{ transform: 'rotate(-4deg)' }}>
          IA puissante
        </span>
      </div>
      <div className="absolute top-[12%] left-[60%] z-[8] hidden md:block pointer-events-none">
        <span className="font-[family-name:var(--font-caveat)] text-sm text-mr-noir-encre/15" style={{ transform: 'rotate(3deg)' }}>
          60 secondes
        </span>
      </div>

      {/* ========= MAIN LAYOUT ========= */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 md:px-10 py-2 flex-shrink-0"
        >
          <div>
            <span className="chrome-text font-[family-name:var(--font-orbitron)] text-lg md:text-xl">MEOWREEL</span>
            <span className="hidden md:inline font-[family-name:var(--font-silkscreen)] text-[7px] text-mr-chrome-gold/60 ml-2" style={{ transform: 'rotate(3deg)' }}>
              VU SUR TIKTOK
            </span>
          </div>
          <span className="font-[family-name:var(--font-silkscreen)] text-[8px] text-mr-noir-encre/30">
            AI VIDEO
          </span>
        </motion.header>

        {/* Content: 2 columns */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">

          {/* LEFT: Hero + Title */}
          <div className="md:w-[42%] flex flex-col items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-2 md:py-0">
            {/* Hero polaroid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative bg-mr-papier-gloss p-2 md:p-3 shadow-[10px_10px_0_var(--color-mr-noir-encre)]"
            >
              <div className="w-[160px] h-[200px] md:w-[250px] md:h-[310px] bg-mr-noir-encre/10 overflow-hidden">
                <video src={heroVideo.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-playfair)] italic text-xs md:text-sm text-center mt-1 text-mr-noir-encre">
                {heroVideo.caption}
              </p>
              <div className="absolute -top-3 -right-3"><MrSticker label="EXEMPLE" color="cyan" size="sm" rotation={12} /></div>
            </motion.div>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center md:text-left">
              <h1 className="font-[family-name:var(--font-anton)] text-[clamp(1.4rem,5vw,2.8rem)] uppercase leading-[0.85]">
                <span className="text-mr-papier-gloss [-webkit-text-stroke:2px_var(--color-mr-noir-encre)] md:[-webkit-text-stroke:3px_var(--color-mr-noir-encre)]" style={{ paintOrder: 'stroke fill' }}>
                  {t('hero.title')}
                </span>
                <br />
                <span className="title-pop">{t('hero.titleAccent')}</span>
              </h1>
              <p className="font-[family-name:var(--font-permanent-marker)] text-sm md:text-lg text-mr-rouge-cerise mt-1" style={{ transform: 'rotate(-2deg)' }}>
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="font-[family-name:var(--font-silkscreen)] text-[7px] md:text-[8px] text-mr-noir-encre/30">
              {t('hero.socialProof')}
            </motion.p>
          </div>

          {/* RIGHT: Scattered polaroid previews */}
          <div className="md:w-[58%] relative flex-1 min-h-[180px] md:min-h-0">
            {previewCats.map((cat, i) => {
              const pos = SCATTER[i % SCATTER.length];
              const hasSticker = i % 3 === 0;
              return (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, scale: 0.5, rotate: pos.rot * 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: pos.rot }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute bg-mr-papier-gloss p-1 md:p-1.5 shadow-[5px_5px_0_var(--color-mr-noir-encre)] cursor-pointer hover:scale-110 hover:z-50 hover:shadow-[8px_8px_0_var(--color-mr-noir-encre)] transition-all duration-200"
                  style={{ top: pos.top, left: pos.left, zIndex: 10 + i }}
                >
                  <div className="overflow-hidden bg-mr-noir-encre/5" style={{ width: pos.w * 0.6, height: pos.h * 0.6 }}>
                    <video src={`/previews/${cat.slug}.mp4`} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] italic text-[7px] md:text-[9px] text-center mt-0.5 text-mr-noir-encre truncate" style={{ maxWidth: pos.w * 0.6 }}>
                    {cat.name.fr}
                  </p>
                  {hasSticker && (
                    <div className="absolute -top-2 -right-2">
                      <MrSticker label={['HOT!', 'NEW!', 'FIRE!'][i % 3]} color={['rouge', 'cyan', 'orange'][i % 3] as 'rouge' | 'cyan' | 'orange'} size="sm" rotation={10 + i * 3} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* PNJ scattered */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="hidden md:block absolute bottom-[8%] right-[8%] z-20" style={{ animation: 'bubble-float 4s ease-in-out infinite', animationDelay: '1s' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/glameow-default.png" alt="" width={55} height={66} className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="hidden md:block absolute top-[38%] right-[4%] z-20" style={{ animation: 'bubble-float 3.5s ease-in-out infinite' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pnj/djmiaou-default.png" alt="" width={45} height={54} className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========= CTA — FIXED BOTTOM, Z-100, HUGE ========= */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-1"
      >
        {/* Guide arrow + text above CTA */}
        <AnimatePresence>
          {showGuideArrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="font-[family-name:var(--font-caveat)] text-sm text-mr-rouge-cerise" style={{ transform: 'rotate(-5deg)' }}>
                appuie ici
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-mr-rouge-cerise animate-bounce">
                <path d="M12 4 L12 18 M6 14 L12 20 L18 14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The big CTA */}
        <button
          onClick={() => { setShowUploadModal(true); setShowGuideArrow(false); }}
          className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-[5px] border-mr-noir-encre rounded-full px-8 py-4 md:px-14 md:py-5 font-[family-name:var(--font-anton)] text-lg md:text-2xl uppercase tracking-wide shadow-[10px_10px_0_var(--color-mr-noir-encre)] hover:scale-110 hover:rotate-0 hover:shadow-[14px_14px_0_var(--color-mr-noir-encre)] active:scale-95 transition-all cursor-pointer"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          UPLOAD TON CHAT &middot; 0,99EUR
        </button>

        {/* Micro text below */}
        <span className="font-[family-name:var(--font-caveat)] text-[11px] text-mr-noir-encre/40">
          ca prend 10 secondes
        </span>
      </motion.div>

      {/* PNJ CATSOME — big, bottom-left, with speech bubble */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="fixed bottom-16 md:bottom-20 left-3 md:left-6 z-[90] flex items-end gap-1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pnj/catsome-default.png" alt="" className="w-[60px] h-[72px] md:w-[90px] md:h-[108px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" />
        <div className="bg-mr-papier-gloss border-2 border-mr-noir-encre rounded-lg px-2 py-1 mb-8 md:mb-12 shadow-[3px_3px_0_var(--color-mr-noir-encre)]" style={{ transform: 'rotate(2deg)' }}>
          <p className="font-[family-name:var(--font-caveat)] text-[10px] md:text-xs text-mr-noir-encre whitespace-nowrap">
            commence par ici !
          </p>
        </div>
      </motion.div>

      {/* ========= UPLOAD MODAL ========= */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-mr-noir-encre/60 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative z-10 w-full md:w-auto md:min-w-[420px] bg-mr-papier-gloss border-4 border-mr-noir-encre shadow-[12px_12px_0_var(--color-mr-noir-encre)] p-6 md:rounded-2xl rounded-t-2xl"
          >
            <h2 className="font-[family-name:var(--font-anton)] text-2xl uppercase text-center mb-4">
              {t('upload.dropzone.default')}
            </h2>
            {uploading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-mr-rose-tama border-t-transparent rounded-full animate-spin" />
                <p className="font-[family-name:var(--font-caveat)] text-lg text-mr-noir-encre/60 mt-2">{t('upload.dropzone.uploading')}</p>
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
            <p className="font-[family-name:var(--font-silkscreen)] text-[9px] text-mr-noir-encre/40 text-center mt-3">{t('upload.hint')}</p>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={handleFileSelect} className="hidden" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
