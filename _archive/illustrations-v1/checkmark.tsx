import { cn } from '@/lib/utils';

type CheckmarkProps = {
  className?: string;
  size?: number;
};

/**
 * Animated green checkmark SVG.
 * Uses stroke-dashoffset animation for "trace" drawing effect.
 */
export function Checkmark({ className, size = 28 }: CheckmarkProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Circle */}
      <circle
        cx="14"
        cy="14"
        r="12"
        fill="var(--mr-stamp-green)"
        opacity="0.15"
        stroke="var(--mr-stamp-green)"
        strokeWidth="2"
      />
      {/* Check path */}
      <path
        d="M8 14 L12 18 L20 10"
        stroke="var(--mr-stamp-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="checkmark-path"
        style={{
          strokeDasharray: 24,
          strokeDashoffset: 0,
        }}
      />
    </svg>
  );
}
