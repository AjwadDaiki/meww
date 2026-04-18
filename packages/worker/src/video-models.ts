/**
 * Video generation model configuration.
 * Locked April 2026. Do not change without discussion.
 */

export const VIDEO_MODELS = {
  primary: {
    slug: 'bytedance/seedance-1-lite',
    costs: {
      '5s_480p': 0.08,
      '5s_720p': 0.18,
      '10s_480p': 0.16,
      '10s_720p': 0.36,
    },
    params: {
      aspect_ratio: '9:16',
      fps: 24,
    },
  },
  fallback: {
    slug: 'wan-video/wan-2.2-i2v-fast',
    costs: {
      '5s_480p': 0.05,
      '5s_720p': 0.11,
    },
    params: {
      aspect_ratio: '9:16',
      num_frames: 120,
    },
  },
} as const;

export const RESOLUTION_BY_PRICE = {
  basic: '480p',   // 0.99EUR base
  premium: '720p', // 1.99EUR+
} as const;

export const GLOBAL_NEGATIVE_PROMPT = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no uncanny valley, no floating objects, no glitches, no artifacts, no multiple cats, no disappearing cat, no cinematic color grading, no studio lighting`;

export function getResolution(priceCents: number): '480p' | '720p' {
  return priceCents >= 199 ? '720p' : '480p';
}

export function getModelCost(
  model: 'primary' | 'fallback',
  duration: 5 | 10,
  resolution: '480p' | '720p'
): number {
  const key = `${duration}s_${resolution}` as keyof typeof VIDEO_MODELS.primary.costs;
  const costs = model === 'primary' ? VIDEO_MODELS.primary.costs : VIDEO_MODELS.fallback.costs;
  return (costs as Record<string, number>)[key] ?? 0.08;
}
