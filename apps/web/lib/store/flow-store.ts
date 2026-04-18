'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STEPS = ['arrival', 'uploaded', 'scene-chosen', 'preview-ready', 'paying', 'producing', 'delivered'] as const;
type FlowStep = (typeof STEPS)[number];

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

type FlowState = {
  currentStep: FlowStep;
  draftOrderId: string | null;
  shortId: string | null;
  photoUrl: string | null;
  selectedCategory: string | null;
  previewImageUrl: string | null;
  lastActivity: number;

  setStep: (step: FlowStep) => void;
  setUploadResult: (orderId: string, shortId: string, photoUrl: string) => void;
  setCategory: (slug: string) => void;
  setPreviewImage: (url: string) => void;
  reset: () => void;
  isExpired: () => boolean;
};

const INITIAL_STATE = {
  currentStep: 'arrival' as FlowStep,
  draftOrderId: null as string | null,
  shortId: null as string | null,
  photoUrl: null as string | null,
  selectedCategory: null as string | null,
  previewImageUrl: null as string | null,
  lastActivity: Date.now(),
};

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setStep: (step) =>
        set({ currentStep: step, lastActivity: Date.now() }),

      setUploadResult: (orderId, shortId, photoUrl) =>
        set({
          draftOrderId: orderId,
          shortId,
          photoUrl,
          currentStep: 'uploaded',
          lastActivity: Date.now(),
        }),

      setCategory: (slug) =>
        set({
          selectedCategory: slug,
          currentStep: 'scene-chosen',
          lastActivity: Date.now(),
        }),

      setPreviewImage: (url) =>
        set({
          previewImageUrl: url,
          currentStep: 'preview-ready',
          lastActivity: Date.now(),
        }),

      reset: () => set({ ...INITIAL_STATE, lastActivity: Date.now() }),

      isExpired: () => {
        const elapsed = Date.now() - get().lastActivity;
        return elapsed > SESSION_TTL_MS;
      },
    }),
    {
      name: 'meowreel-flow',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
        }
        return sessionStorage;
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.isExpired()) {
          state.reset();
        }
      },
    }
  )
);

export type { FlowStep };
export { STEPS };
