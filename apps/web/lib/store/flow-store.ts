'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STEPS = ['upload', 'category', 'payment', 'processing', 'done'] as const;
type FlowStep = (typeof STEPS)[number];

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

type FlowState = {
  currentStep: FlowStep;
  draftOrderId: string | null;
  lastActivity: number;

  setStep: (step: FlowStep) => void;
  setDraftOrderId: (id: string) => void;
  reset: () => void;
  isExpired: () => boolean;
};

const INITIAL_STATE = {
  currentStep: 'upload' as FlowStep,
  draftOrderId: null as string | null,
  lastActivity: Date.now(),
};

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setStep: (step: FlowStep) =>
        set({ currentStep: step, lastActivity: Date.now() }),

      setDraftOrderId: (id: string) =>
        set({ draftOrderId: id, lastActivity: Date.now() }),

      reset: () => set(INITIAL_STATE),

      isExpired: () => {
        const elapsed = Date.now() - get().lastActivity;
        return elapsed > SESSION_TTL_MS;
      },
    }),
    {
      name: 'meowreel-flow',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          // SSR: return noop storage
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return sessionStorage;
      }),
      onRehydrateStorage: () => (state) => {
        // Auto-reset if session expired
        if (state?.isExpired()) {
          state.reset();
        }
      },
    }
  )
);

export type { FlowStep };
export { STEPS };
