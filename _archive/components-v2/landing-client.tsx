'use client';

import { MrBackground } from '@/components/ui/mr-background';
import { HeroSection } from '@/components/landing/hero-section';
import { CategorySection } from '@/components/landing/category-section';
import { FaqSection } from '@/components/landing/faq-section';
import { FooterSection } from '@/components/landing/footer-section';

// Placeholder categories until we seed from MongoDB
const CATEGORIES = {
  trending: [
    { slug: 'midnight-porch-musician', name: 'Midnight Porch Musician' },
    { slug: 'ring-doorbell-chaos', name: 'Ring Doorbell Chaos' },
    { slug: 'drive-through-worker', name: 'Drive-Through Worker' },
    { slug: 'late-night-news', name: 'News Anchor 3AM' },
    { slug: 'restaurant-waiter', name: 'Restaurant Waiter' },
    { slug: 'security-cam-confused', name: 'Security Cam Confused' },
  ],
  music: [
    { slug: 'jazz-trumpet', name: 'Jazz Trumpet' },
    { slug: 'rock-guitarist', name: 'Rock Guitarist' },
    { slug: 'club-dj', name: 'DJ Club Set' },
    { slug: 'classical-pianist', name: 'Classical Pianist' },
    { slug: 'rap-booth', name: 'Rap Booth' },
    { slug: 'kpop-idol', name: 'K-pop Idol' },
  ],
  sports: [
    { slug: 'football-goal', name: 'Football Goal Celebration' },
    { slug: 'boxer-ring', name: 'Boxing Ring Knockout' },
    { slug: 'surfer-wave', name: 'Surfer Wave' },
    { slug: 'basketball-dunk', name: 'Basketball Dunk' },
    { slug: 'tennis-champion', name: 'Tennis Champion' },
    { slug: 'f1-driver', name: 'F1 Driver' },
  ],
  dance: [
    { slug: 'tiktok-trend-dance', name: 'TikTok Trend Dance' },
    { slug: 'classical-ballet', name: 'Ballet Classical' },
    { slug: 'disco-70s', name: 'Disco 70s' },
    { slug: 'breakdance', name: 'Breakdance' },
    { slug: 'salsa-couple', name: 'Salsa Couple' },
    { slug: 'ballroom-waltz', name: 'Ballroom Waltz' },
  ],
  cinematic: [
    { slug: 'night-ninja', name: 'Ninja Night' },
    { slug: 'samurai-edo', name: 'Samourai Edo' },
    { slug: 'far-west-cowboy', name: 'Cowboy Far West' },
    { slug: 'nasa-astronaut', name: 'Astronaut NASA' },
    { slug: 'roman-gladiator', name: 'Gladiator Rome' },
    { slug: 'viking-warrior', name: 'Viking Warrior' },
  ],
  moments: [
    { slug: 'birthday-party', name: 'Birthday Party' },
    { slug: 'wedding-day', name: 'Wedding Day' },
    { slug: 'christmas-eve', name: 'Christmas Eve' },
    { slug: 'halloween-night', name: 'Halloween' },
    { slug: 'graduation-day', name: 'Graduation' },
  ],
};

export function LandingClient() {
  return (
    <main className="relative">
      <MrBackground />

      <div className="relative z-10">
        <HeroSection />

        <div className="max-w-6xl mx-auto">
          <CategorySection sectionKey="trending" categories={CATEGORIES.trending} />
          <CategorySection sectionKey="music" categories={CATEGORIES.music} />
          <CategorySection sectionKey="sports" categories={CATEGORIES.sports} />
          <CategorySection sectionKey="dance" categories={CATEGORIES.dance} />
          <CategorySection sectionKey="cinematic" categories={CATEGORIES.cinematic} />
          <CategorySection sectionKey="moments" categories={CATEGORIES.moments} />
        </div>

        <FaqSection />
        <FooterSection />
      </div>
    </main>
  );
}
