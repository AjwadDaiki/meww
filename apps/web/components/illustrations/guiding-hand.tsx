import { cn } from '@/lib/utils';

type GuidingHandProps = {
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Ligne claire cartoon hand with index finger pointing down.
 * Style: Tintin/Moebius, 4-5 simplified fingers, clean outlines.
 */
export function GuidingHand({ className, width = 80, height = 100 }: GuidingHandProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Wrist */}
      <path
        d="M28 2 C32 0, 48 0, 52 2 L54 20 L26 20 Z"
        fill="#f0d0b0"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Palm */}
      <path
        d="M22 18 C18 22, 16 32, 18 42 C20 52, 26 56, 34 58
           L34 58 C36 56, 44 56, 46 58
           C54 56, 60 52, 62 42 C64 32, 62 22, 58 18 Z"
        fill="#f0d0b0"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Palm shadow */}
      <path
        d="M26 34 C28 42, 32 50, 34 54 L46 54 C50 46, 54 38, 54 30 Z"
        fill="#d4b090"
        opacity="0.35"
      />
      {/* Index finger — pointing down */}
      <path
        d="M34 56 C33 62, 32 72, 33 82 C34 88, 36 94, 38 98
           C40 98, 42 94, 43 88 C44 78, 44 68, 46 56 Z"
        fill="#f0d0b0"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Index finger shadow */}
      <path
        d="M38 70 C39 78, 40 86, 40 92 C42 90, 43 82, 44 72 Z"
        fill="#d4b090"
        opacity="0.3"
      />
      {/* Thumb — visible, curled */}
      <path
        d="M22 30 C16 34, 12 40, 14 46 C16 50, 20 50, 22 46"
        fill="none"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 36 C16 40, 16 44, 18 46"
        fill="#f0d0b0"
        stroke="none"
      />
      {/* Other fingers — curled inward */}
      <path
        d="M46 54 C48 52, 52 50, 54 48"
        stroke="var(--mr-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 52 C54 50, 56 46, 58 42"
        stroke="var(--mr-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Knuckle lines */}
      <path
        d="M30 42 C32 40, 36 40, 38 42"
        stroke="var(--mr-ink)"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M42 40 C44 38, 48 38, 50 40"
        stroke="var(--mr-ink)"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}
