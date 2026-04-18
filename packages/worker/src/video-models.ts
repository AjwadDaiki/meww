/**
 * Video generation model configuration.
 * Locked April 2026. Do not change without discussion.
 */

export const VIDEO_MODELS = {
  // Without sound (default)
  silent_primary: {
    slug: 'bytedance/seedance-1-lite',
    costs: {
      '5s_480p': 0.08,
      '5s_720p': 0.18,
      '10s_480p': 0.16,
      '10s_720p': 0.36,
    },
  },
  silent_fallback: {
    slug: 'wan-video/wan-2.2-i2v-fast',
    costs: {
      '5s_480p': 0.05,
      '5s_720p': 0.11,
    },
  },
  // With sound (+0.99EUR)
  audio_primary: {
    slug: 'wan-video/wan-2.5-i2v-fast',
    costs: {
      '5s_480p': 0.15,
      '5s_720p': 0.30,
      '10s_480p': 0.30,
      '10s_720p': 0.60,
      '15s_720p': 0.90,
    },
  },
  audio_fallback: {
    slug: 'bytedance/seedance-2-fast',
    costs: {
      '5s_480p': 0.20,
      '5s_720p': 0.40,
    },
  },
} as const;

export const GLOBAL_NEGATIVE_PROMPT = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no uncanny valley, no floating objects, no glitches, no artifacts, no multiple cats, no disappearing cat, no cinematic color grading, no studio lighting`;

export function selectModel(sound: boolean): {
  primary: typeof VIDEO_MODELS[keyof typeof VIDEO_MODELS];
  fallback: typeof VIDEO_MODELS[keyof typeof VIDEO_MODELS];
} {
  if (sound) {
    return {
      primary: VIDEO_MODELS.audio_primary,
      fallback: VIDEO_MODELS.audio_fallback,
    };
  }
  return {
    primary: VIDEO_MODELS.silent_primary,
    fallback: VIDEO_MODELS.silent_fallback,
  };
}

export function getResolution(priceCents: number): '480p' | '720p' {
  return priceCents >= 198 ? '720p' : '480p';
}
