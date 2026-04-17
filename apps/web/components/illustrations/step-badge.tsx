import { cn } from '@/lib/utils';

type StepBadgeProps = {
  step: number;
  className?: string;
  size?: number;
};

/**
 * Numbered circle badge for flow steps.
 * Cream background, thick ink border, Cormorant Garamond bold number.
 */
export function StepBadge({ step, className, size = 32 }: StepBadgeProps) {
  const r = size / 2;
  const strokeW = 2.5;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={r}
          cy={r}
          r={r - strokeW}
          fill="var(--mr-paper)"
          stroke="var(--mr-ink)"
          strokeWidth={strokeW}
        />
      </svg>
      <span
        className="absolute font-[family-name:var(--font-cormorant)] font-bold text-mr-ink"
        style={{ fontSize: size * 0.5 }}
      >
        {step}
      </span>
    </div>
  );
}
