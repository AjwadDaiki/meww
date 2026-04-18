import { cn } from '@/lib/utils';

type GuideArrowProps = {
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Handwritten-style arrow SVG for path animation.
 * Trace with stroke-dashoffset animation for "drawing" effect.
 */
export function GuideArrow({ className, width = 200, height = 120 }: GuideArrowProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Main curved arrow line */}
      <path
        d="M180 20 C160 15, 120 10, 80 30 C40 50, 20 70, 30 100"
        stroke="var(--mr-ink-red)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-path"
      />
      {/* Arrow head */}
      <path
        d="M20 90 L30 100 L40 88"
        stroke="var(--mr-ink-red)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-head"
      />
    </svg>
  );
}
